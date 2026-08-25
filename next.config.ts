import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/checkin",
        destination: "/checkin.html",
      },
    ];
  },
};

export default nextConfig;
