// Supabase Edge Function — Claude proxy.
//
// PURPOSE
//   Keeps the Anthropic API key on the server. The browser never sees it.
//   The frontend POSTs { model?, max_tokens?, system?, messages[] } here,
//   we forward to api.anthropic.com adding the secret key, and return
//   { text, usage } to the browser.
//
// DEPLOY (one-time)
//   1. Connect Supabase from the Lovable project (Cloud panel).
//   2. Set the secret in Supabase dashboard (or via CLI):
//        supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   3. Deploy:
//        supabase functions deploy ai-proxy --no-verify-jwt
//      (or let Lovable do it from the chat: "deploy edge function ai-proxy")
//   4. In the Lovable project env, set:
//        VITE_AI_PROXY_URL=https://<project-ref>.functions.supabase.co/ai-proxy
//
// SECURITY NOTES
//   - This function does NOT verify the caller's identity. Anyone who knows
//     the URL can invoke it (and consume your Anthropic credits). Acceptable
//     while the app's own auth is still client-side; tighten later by:
//       a) requiring a Supabase JWT (remove --no-verify-jwt) and checking the user role
//       b) restricting CORS via the ALLOWED_ORIGIN env var
//       c) rate-limiting per IP / per user
//   - To restrict origin, set ALLOWED_ORIGIN=https://your-app.lovable.app
//     in Supabase secrets. Defaults to "*" if unset.

/// <reference lib="deno.ns" />

const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Max-Age': '86400',
};

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ProxyBody {
  model?: string;
  max_tokens?: number;
  system?: string;
  messages: ClaudeMessage[];
}

const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const DEFAULT_MAX_TOKENS = 2500;
const HARD_MAX_TOKENS = 4096;

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return jsonResponse(
      { error: 'Server misconfigured: ANTHROPIC_API_KEY not set' },
      500,
    );
  }

  let body: ProxyBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonResponse({ error: 'messages[] required and non-empty' }, 400);
  }
  for (const m of body.messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return jsonResponse({ error: 'Invalid message shape' }, 400);
    }
  }

  const maxTokens = Math.min(
    Math.max(1, body.max_tokens ?? DEFAULT_MAX_TOKENS),
    HARD_MAX_TOKENS,
  );

  let upstream: Response;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: body.model || DEFAULT_MODEL,
        max_tokens: maxTokens,
        system: body.system,
        messages: body.messages,
      }),
    });
  } catch (e) {
    return jsonResponse(
      { error: 'Upstream fetch failed', detail: (e as Error).message },
      502,
    );
  }

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    const message = (data as { error?: { message?: string } })?.error?.message
      ?? `Anthropic ${upstream.status}`;
    return jsonResponse({ error: message }, upstream.status);
  }

  const text = (data as { content?: Array<{ text?: string }> })?.content?.[0]?.text ?? '';
  const usage = (data as { usage?: unknown })?.usage;
  return jsonResponse({ text, usage });
});
