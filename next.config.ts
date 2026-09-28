import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.77"],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "raw.githubusercontent.com",
        port: "3000",
        pathname: "/**",
        search: "",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
