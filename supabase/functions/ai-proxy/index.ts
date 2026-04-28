// Supabase Edge Function — AI proxy via Lovable AI Gateway.
//
// PURPOSE
//   Server-side bridge between the frontend (which calls
//   `supabase.functions.invoke('ai-proxy', { body })`) and the Lovable AI
//   Gateway. The Gateway gives us access to top-tier models (currently
//   google/gemini-2.5-pro) using LOVABLE_API_KEY, which is auto-provisioned
//   for every Lovable Cloud project. No third-party API key is needed and
//   nothing sensitive ever touches the browser.
//
// REQUEST SHAPE (from the client)
//   {
//     system?:  string,             // optional system prompt
//     messages: { role, content }[],// chat history (Anthropic-style)
//     max_tokens?: number,          // defaults to 2500
//     model?: string                // optional override (gateway model id)
//   }
//
// RESPONSE SHAPE (Anthropic-compatible)
//   {
//     text: string,                       // primary text output
//     content: [{ type: 'text', text }],  // legacy Anthropic shape
//     usage:   { input_tokens, output_tokens }
//   }
//
// SECRETS
//   - LOVABLE_API_KEY    auto-provisioned by Lovable Cloud
//   - ALLOWED_ORIGIN     optional, defaults to '*'
//
// DEPLOY (Lovable handles this automatically on each repo change)
//   supabase functions deploy ai-proxy --no-verify-jwt
//
// SECURITY NOTE
//   verify_jwt is disabled (see supabase/config.toml) because the app's own
//   auth is still client-side. Tighten by enabling JWT verification once
//   Supabase Auth is integrated. CORS can be locked down by setting
//   ALLOWED_ORIGIN as a Supabase secret (e.g. https://your-app.lovable.app).

/// <reference lib="deno.ns" />

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.5-pro';
const DEFAULT_MAX_TOKENS = 2500;

const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface IncomingPayload {
  system?: string;
  messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  max_tokens?: number;
  model?: string;
}

Deno.serve(async (req: Request) => {
  // Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!apiKey) {
    return jsonResponse(
      { error: 'LOVABLE_API_KEY is not configured on the server' },
      500,
    );
  }

  let payload: IncomingPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const messages = payload.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: 'messages[] is required' }, 400);
  }

  // Translate Anthropic-style { system, messages } into the OpenAI-style
  // chat-completions payload the Lovable Gateway expects.
  const chatMessages: ChatMessage[] = [];
  if (payload.system && payload.system.trim()) {
    chatMessages.push({ role: 'system', content: payload.system });
  }
  for (const m of messages) {
    if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') {
      chatMessages.push({ role: m.role, content: m.content });
    }
  }

  const upstreamBody = {
    model: payload.model || DEFAULT_MODEL,
    messages: chatMessages,
    max_tokens: payload.max_tokens || DEFAULT_MAX_TOKENS,
  };

  let upstream: Response;
  try {
    upstream = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return jsonResponse({ error: `Gateway unreachable: ${msg}` }, 502);
  }

  // Surface known rate / quota errors with their original status.
  if (upstream.status === 429) {
    return jsonResponse(
      { error: 'Rate limit exceeded — please retry in a moment.' },
      429,
    );
  }
  if (upstream.status === 402) {
    return jsonResponse(
      { error: 'Payment required: AI quota exhausted on this workspace.' },
      402,
    );
  }
  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    return jsonResponse(
      {
        error: `Upstream ${upstream.status}: ${detail.slice(0, 300) || upstream.statusText}`,
      },
      upstream.status,
    );
  }

  let upstreamJson: unknown;
  try {
    upstreamJson = await upstream.json();
  } catch {
    return jsonResponse({ error: 'Upstream returned non-JSON' }, 502);
  }

  // OpenAI chat-completions shape:
  //   { choices: [{ message: { content } }], usage: { prompt_tokens, completion_tokens } }
  const data = upstreamJson as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  const text = data.choices?.[0]?.message?.content ?? '';
  const usage = {
    input_tokens: data.usage?.prompt_tokens ?? 0,
    output_tokens: data.usage?.completion_tokens ?? 0,
  };

  return jsonResponse({
    text,
    content: [{ type: 'text', text }],
    usage,
  });
});
