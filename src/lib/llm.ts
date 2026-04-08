// Claude API client - runs in browser with user-provided API key
// Key is stored in localStorage under 'oxy_api_key'

export const getApiKey = (): string | null => {
  try { return localStorage.getItem('oxy_api_key'); } catch { return null; }
};

export const setApiKey = (key: string) => {
  try { localStorage.setItem('oxy_api_key', key); } catch {}
};

export const hasApiKey = () => !!getApiKey();

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function callClaude(opts: {
  system: string;
  messages: ClaudeMessage[];
  model?: string;
  max_tokens?: number;
}): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key mancante. Configurala in Impostazioni.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: opts.model || 'claude-sonnet-4-5-20250929',
      max_tokens: opts.max_tokens || 2500,
      system: opts.system,
      messages: opts.messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '';
}

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
