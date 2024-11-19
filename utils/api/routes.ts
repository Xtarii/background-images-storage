/// API routes config
///

import { createClient } from "@supabase/supabase-js";
import path from "path";



/**
 * API Routes Base Path
 */
export const base = "https://uyfiatbchvzyavoatgyk.supabase.co";

/**
 * Client Connection
 */
export const supabase = createClient(
    base,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZmlhdGJjaHZ6eWF2b2F0Z3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMDQ5OTYsImV4cCI6MjA0NzU4MDk5Nn0.NILas5jUlZMYWX70sUkrrISd3Iwcf1dIyPbyzuMMY8c"
);
