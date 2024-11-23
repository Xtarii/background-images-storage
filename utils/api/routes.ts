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





/**
 * Page Base URL
 */
export const base = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/background-images-storage/" : "";
/**
 * Page Links used in the Navbar
 */
export const links = {
    home:       `${base}/`,
    post:       `${base}/post`,
    explore:    `${base}/explore`
};
