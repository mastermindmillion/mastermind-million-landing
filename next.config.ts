import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/preconfirmaci%C3%B3n",
        destination: "/preconfirmacion",
        permanent: false,
      },
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
      {
        source: "/generales",
        destination: "/invitacion-generales.html",
      },
    ];
  },
};

export default nextConfig;
