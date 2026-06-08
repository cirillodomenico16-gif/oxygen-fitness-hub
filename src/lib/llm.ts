// AI client — calls the `ai-proxy` edge function which routes to the
// Lovable AI Gateway server-side. No API keys are stored in the browser.

async function getSupabaseClient() {
  const mod = await import('@/integrations/supabase/client');
  return mod.supabase;
}

// Backwards-compat shims (some pages still import these). AI is always on
// server-side now, so hasApiKey() returns true and setters are no-ops.
export const getApiKey = (): string | null => 'lovable-gateway';
export const setApiKey = (_key: string) => { /* no-op: managed server-side */ };
export const hasApiKey = () => true;

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
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.functions.invoke('ai-proxy', {
    body: {
      system: opts.system,
      messages: opts.messages,
      max_tokens: opts.max_tokens || 2500,
    },
  });

  if (error) {
    throw new Error(`AI proxy error: ${error.message || 'unknown'}`);
  }
  if (data?.error) {
    throw new Error(data.error);
  }
  return data?.content?.[0]?.text || '';
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
