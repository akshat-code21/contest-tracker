import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds : true
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
