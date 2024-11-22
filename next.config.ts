import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/background-images-storage" : "",

  env: {
    NEXT_PUBLIC_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_SECRET_KEY : process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
  },

  output: "export",
  reactStrictMode: true
};

export default nextConfig;
