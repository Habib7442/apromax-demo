import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for client-side usage (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to get admin client for server-side operations (bypassing RLS if needed)
export const getSupabaseAdmin = () => {
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Using anon key which may be restricted by RLS.');
    return supabase;
  }
  return createClient(supabaseUrl, supabaseServiceKey);
};
