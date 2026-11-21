import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // La dirección principal lleva al sitio en español.
    return [{ source: "/", destination: "/es", permanent: false }];
  },
};

export default nextConfig;
