# ai-proxy

Edge Function that forwards browser requests to the Anthropic Messages API,
keeping the API key server-side.

## Setup (via Lovable + Supabase)

1. Connect Supabase to the Lovable project (Cloud panel → Connect Supabase).
2. In Lovable chat: **"deploy edge function ai-proxy"**.
3. Add the secret in Supabase dashboard → Project Settings → Edge Functions → Secrets:
   - `ANTHROPIC_API_KEY` = `sk-ant-...`
   - (optional) `ALLOWED_ORIGIN` = `https://your-app.lovable.app`
4. Add the env var to the Lovable project:
   - `VITE_AI_PROXY_URL` = `https://<project-ref>.functions.supabase.co/ai-proxy`

After step 4 the frontend automatically uses the proxy. No code change needed.

## Setup (via Supabase CLI, alternative)

```bash
supabase link --project-ref <project-ref>
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase functions deploy ai-proxy --no-verify-jwt
```

## Request / Response

```http
POST /ai-proxy
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 2500,
  "system": "You are a fitness coach...",
  "messages": [{ "role": "user", "content": "..." }]
}
```

```json
{ "text": "...assistant reply...", "usage": { ... } }
```

## Hardening checklist (do before public launch)

- [ ] Remove `verify_jwt = false` from `supabase/config.toml` and check user role inside the function.
- [ ] Set `ALLOWED_ORIGIN` to the production domain instead of `*`.
- [ ] Add per-user rate limiting (Supabase has `Deno.env` + a `kv` you can use, or use Upstash).
- [ ] Log requests to a Supabase table for auditing / cost tracking.
