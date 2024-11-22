/// API routes config
///

import { createClient } from "@supabase/supabase-js";



/**
 * Client Connection
 */
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "",
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY ? process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY : ""
);
