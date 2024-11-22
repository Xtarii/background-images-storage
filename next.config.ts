import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  // basePath: process.env.NODE_ENV === "production" ? "/background-images-storage" : "",

  env: {
    SUPABASE_URL : process.env.SUPABASE_URL,
    SUPABASE_SECRET_KEY : process.env.SUPABASE_SECRET_KEY
  },

  output: "export",
  reactStrictMode: true
};

export default nextConfig;
