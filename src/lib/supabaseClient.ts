// Supabase client.
//
// In Lovable Cloud, VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are
// auto-injected at build time. Locally, set them in a .env.local file
// (see .env.example).
//
// If they're missing (e.g. local dev without Supabase), the client is still
// instantiated with empty strings and downstream calls will throw a clear
// error via isSupabaseConfigured() guards.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
