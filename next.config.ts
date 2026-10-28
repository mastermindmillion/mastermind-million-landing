import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/calendar",
        destination:
          "https://calendar.google.com/calendar/u/0?cid=Y18xNDM5ODUxMGIxZTE4YTQyMjAyOTdmZTZkZWVkMWM4NjhjM2Y5NTg0ZWJkZDE3MGIxYWUwZjg1ZDI0NDVjNzQ3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
        permanent: false,
      },
    ];
  },
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
