import type { NextConfig } from "next";



const isProduction = process.env.NODE_ENV === "production";



const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: isProduction ? "/background-images-storage/" : "",
  basePath: isProduction ? "/background-images-storage/" : "",

  output: "export",
  reactStrictMode: true
};

export default nextConfig;
