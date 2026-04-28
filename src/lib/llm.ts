// AI client.
//
// All AI calls go through the Supabase Edge Function `ai-proxy`. The proxy is
// deployed via Lovable Cloud and uses LOVABLE_API_KEY (Lovable AI Gateway,
// model: google/gemini-2.5-pro). No third-party API keys touch the browser.
//
// Architecture:
//   client (this file) -> getSupabase().functions.invoke('ai-proxy', { body })
//                       -> Supabase Edge Function (server-side LOVABLE_API_KEY)
//                       -> Lovable AI Gateway -> Gemini 2.5 Pro
//
// Migration note: legacy modes ("direct" call to api.anthropic.com from the
// browser, and the VITE_AI_PROXY_URL fetch shim) have been removed.

import { getSupabase, isSupabaseConfigured } from './supabaseClient';

export const isAiConfigured = (): boolean => isSupabaseConfigured();

/** Backwards-compat alias for the old API-key-in-localStorage UI. */
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

const DEFAULT_MAX_TOKENS = 2500;

/**
 * Invoke the `ai-proxy` Edge Function. Keeps the function name `callClaude`
 * for backwards compat with the rest of the codebase, but the underlying
 * model is whatever the edge function selects (currently Gemini 2.5 Pro).
 */
export async function callClaude(opts: CallClaudeOptions): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error('AI non configurato: Supabase env mancante.');
  }

  const { data, error } = await getSupabase().functions.invoke('ai-proxy', {
    body: {
      system: opts.system,
      messages: opts.messages,
      max_tokens: opts.max_tokens ?? DEFAULT_MAX_TOKENS,
      // model intentionally omitted; the edge function picks the model.
    },
  });

  if (error) {
    throw new Error(`AI proxy: ${error.message || 'unknown error'}`);
  }

  // Normalize response: edge function returns either { text } or
  // Anthropic-style { content: [{ text }] }.
  const anyData = data as { text?: string; content?: Array<{ text?: string }> } | null;
  if (typeof anyData?.text === 'string') return anyData.text;
  const content = anyData?.content?.[0]?.text;
  if (typeof content === 'string') return content;
  return '';
}

/** No-op kept for compat — the legacy localStorage key is no longer used. */
export const purgeLegacyApiKey = () => {
  try { localStorage.removeItem('oxy_api_key'); } catch {
    // ignore
  }
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
