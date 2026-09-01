import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/checkin",
        destination: "/checkin.html",
      },
      {
        source: "/encuesta",
        destination: "/encuesta.html",
      },
    ];
  },
};

export default nextConfig;
