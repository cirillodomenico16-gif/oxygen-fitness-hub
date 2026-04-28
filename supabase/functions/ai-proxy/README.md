# `ai-proxy` Edge Function

Server-side bridge between the Oxygen Fitness Hub frontend and the
**Lovable AI Gateway**. Keeps API credentials out of the browser and lets us
swap models without redeploying the client.

## How it works

```
React client
   |
   | supabase.functions.invoke('ai-proxy', { body })
   v
Supabase Edge Function (this folder)
   |
   | fetch -> https://ai.gateway.lovable.dev/v1/chat/completions
   |          Authorization: Bearer ${LOVABLE_API_KEY}
   v
Lovable AI Gateway -> google/gemini-2.5-pro
```

## Request / response shapes

The function accepts an **Anthropic-style** body so existing client code keeps
working, and returns an **Anthropic-style** response so callers can read either
`data.text` or `data.content[0].text`.

### Request (from the client)

```json
{
  "system": "You are a helpful coach.",
  "messages": [
    { "role": "user", "content": "Genera una scheda settimanale." }
  ],
  "max_tokens": 2500,
  "model": "google/gemini-2.5-pro"
}
```

`model` is optional — defaults to `google/gemini-2.5-pro`.

### Response

```json
{
  "text": "...",
  "content": [{ "type": "text", "text": "..." }],
  "usage": { "input_tokens": 123, "output_tokens": 456 }
}
```

## Configuration

| Secret              | Required | Description                                                |
| ------------------- | -------- | ---------------------------------------------------------- |
| `LOVABLE_API_KEY`   | yes      | Auto-provisioned by Lovable Cloud. Don't set it manually.  |
| `ALLOWED_ORIGIN`    | no       | CORS origin lockdown. Defaults to `*`. Recommended in prod. |

## Deploy

Lovable Cloud auto-deploys on every change to this folder pushed to the
linked branch. Manual deploy:

```bash
supabase functions deploy ai-proxy --no-verify-jwt
```

`verify_jwt` is disabled in `supabase/config.toml` because the app's own
auth is currently client-side. Re-enable it once Supabase Auth is integrated.

## Switching models

Edit `DEFAULT_MODEL` in `index.ts`. Models exposed by the Lovable AI Gateway
include `google/gemini-2.5-pro` and `openai/gpt-5` (Anthropic models are not
currently available through the Gateway; if Claude is mandatory, swap this
function for a direct call to `https://api.anthropic.com/v1/messages` with an
`ANTHROPIC_API_KEY` secret).
