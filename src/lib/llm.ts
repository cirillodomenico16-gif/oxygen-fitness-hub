// Claude client.
//
// All AI calls go through the Supabase Edge Function `ai-proxy`. The Anthropic
// API key lives on the server and is never shipped to the browser.
// Configure VITE_AI_PROXY_URL in the project env (see .env.example).
//
// If VITE_AI_PROXY_URL is not configured, callClaude() rejects with a clear
// error and the UI falls back to the deterministic local generator.

const PROXY_URL = (import.meta.env.VITE_AI_PROXY_URL as string | undefined)?.trim();

export const isAiConfigured = (): boolean => !!PROXY_URL;

/** Backwards-compat alias. Prefer isAiConfigured(). */
export const hasApiKey = isAiConfigured;

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CallClaudeOptions {
  system: string;
  messages: ClaudeMessage[];
  model?: string;
  max_tokens?: number;
}

const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const DEFAULT_MAX_TOKENS = 2500;

export async function callClaude(opts: CallClaudeOptions): Promise<string> {
  if (!PROXY_URL) {
    throw new Error('AI non configurato: imposta VITE_AI_PROXY_URL.');
  }

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: opts.model || DEFAULT_MODEL,
      max_tokens: opts.max_tokens || DEFAULT_MAX_TOKENS,
      system: opts.system,
      messages: opts.messages,
    }),
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`AI proxy ${res.status}: ${err.slice(0, 200) || res.statusText}`);
  }

  const data = await res.json().catch(() => null);
  if (typeof data?.text === 'string') return data.text;
  return data?.content?.[0]?.text || '';
}

/** One-time cleanup of the legacy localStorage entry where the key used to live. */
export const purgeLegacyApiKey = () => {
  try { localStorage.removeItem('oxy_api_key'); } catch {}
};

// ---------- History helpers ----------
export interface PlanRecord {
  date: string;
  timestamp: number;
  plan: string;
  answers: Record<string, string>;
  source: 'ai' | 'template';
}

export const getHistory = (type: 'scheda' | 'dieta', memberId: string): PlanRecord[] => {
  try {
    return JSON.parse(localStorage.getItem(`oxy_${type}_history_${memberId}`) || '[]');
  } catch {
    return [];
  }
};

export const saveToHistory = (type: 'scheda' | 'dieta', memberId: string, record: PlanRecord) => {
  const history = getHistory(type, memberId);
  history.unshift(record);
  localStorage.setItem(`oxy_${type}_history_${memberId}`, JSON.stringify(history.slice(0, 10)));
  localStorage.setItem(`oxy_${type}_${memberId}`, JSON.stringify({ plan: record.plan, date: record.date, answers: record.answers }));
};

// ---------- Notifications ----------
export interface Notification {
  id: string;
  memberId: string;
  type: 'scheda' | 'dieta' | 'info';
  title: string;
  body: string;
  date: string;
  timestamp: number;
  read: boolean;
}

export const getNotifications = (memberId: string): Notification[] => {
  try { return JSON.parse(localStorage.getItem(`oxy_notif_${memberId}`) || '[]'); }
  catch { return []; }
};

export const pushNotification = (memberId: string, n: Omit<Notification, 'id' | 'timestamp' | 'read' | 'memberId'>) => {
  const list = getNotifications(memberId);
  list.unshift({ ...n, id: `n_${Date.now()}`, memberId, timestamp: Date.now(), read: false });
  localStorage.setItem(`oxy_notif_${memberId}`, JSON.stringify(list.slice(0, 30)));
};
