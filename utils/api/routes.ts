/// API routes config
///

import { createClient } from "@supabase/supabase-js";



/**
 * Client Connection
 */
export const supabase = createClient(
    process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "",
    process.env.SUPABASE_SECRET_KEY ? process.env.SUPABASE_SECRET_KEY : ""
);
