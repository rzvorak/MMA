import { createBrowserClient } from '@supabase/ssr'

export async function createClient() {
    const client = createBrowserClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    )
  
    return client;
  }