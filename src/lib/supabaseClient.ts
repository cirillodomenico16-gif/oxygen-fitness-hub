// Supabase client (lazy).
//
// In Lovable Cloud, VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are
// auto-injected at build time. Locally, set them in a .env.local file
// (see .env.example).
//
// IMPORTANT: createClient() validates its inputs and throws synchronously
// when the URL is empty. To avoid crashing the whole bundle at import time
// in environments where Supabase is not configured (e.g. local dev without
// a .env.local), we lazy-instantiate the client on first use.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let _client: SupabaseClient | null = null;

/** Returns a Supabase client, creating it on first use. Throws if env is missing. */
export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase non configurato: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY mancanti.',
    );
  }
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return _client;
}
