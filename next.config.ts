import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  // basePath: process.env.NODE_ENV === "production" ? "/background-images-storage" : "",

  env: {
    MODE: process.env.MODE
  },

  output: "export",
  reactStrictMode: true
};

export default nextConfig;
