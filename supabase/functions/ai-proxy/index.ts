// AI proxy: routes requests to the Lovable AI Gateway.
// Accepts an Anthropic-style payload (system + messages + max_tokens) and
// returns a response shaped like Anthropic's `content[0].text` so the existing
// client code keeps working without changes.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Lovable AI Gateway does not expose Claude models; google/gemini-2.5-pro is
// the strongest available option (equivalent tier to Claude Sonnet / GPT-5).
const DEFAULT_MODEL = 'google/gemini-2.5-pro';

interface InMessage {
  role: 'user' | 'assistant';
  content: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'LOVABLE_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const system: string = typeof body?.system === 'string' ? body.system : '';
    const messages: InMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const max_tokens: number = Number.isFinite(body?.max_tokens) ? body.max_tokens : 2500;

    if (!messages.length) {
      return new Response(
        JSON.stringify({ error: 'messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const openaiMessages: { role: string; content: string }[] = [];
    if (system) openaiMessages.push({ role: 'system', content: system });
    for (const m of messages) {
      if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue;
      openaiMessages.push({ role: m.role, content: String(m.content ?? '') });
    }

    const upstream = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: openaiMessages,
        max_completion_tokens: max_tokens,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error('AI gateway error', upstream.status, errText);
      if (upstream.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit superato. Riprova tra poco.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      if (upstream.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Crediti AI esauriti. Aggiungi credito al workspace Lovable.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      return new Response(
        JSON.stringify({ error: `AI gateway ${upstream.status}: ${errText.slice(0, 200)}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const data = await upstream.json();
    const text: string = data?.choices?.[0]?.message?.content ?? '';

    // Anthropic-compatible shape so the existing client keeps working.
    return new Response(
      JSON.stringify({
        content: [{ type: 'text', text }],
        model: DEFAULT_MODEL,
        provider: 'lovable-gateway',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('ai-proxy fatal', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
