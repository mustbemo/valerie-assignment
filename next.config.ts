import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/robot.glb",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
