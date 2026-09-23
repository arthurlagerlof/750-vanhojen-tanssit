import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseKey) {
    throw new Error("Missing SUPABASE_SECRET_KEY");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}