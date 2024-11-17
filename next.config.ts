import type { NextConfig } from "next";



const isProduction = process.env.NODE_ENV === "production";



const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: isProduction ? "https://xtarii.github.io/background-images-storage/" : "",
  basePath: isProduction ? "https://xtarii.github.io/background-images-storage/" : "",

  output: "export",
  reactStrictMode: true
};

export default nextConfig;
