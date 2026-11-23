import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La dirección principal lleva al sitio en español.
      { source: "/", destination: "/es", permanent: false },

      // Dirección a la que Stripe devuelve a la persona después de pagar.
      // Es una sola para todos los enlaces de pago: según el idioma que la persona
      // tenía en el sitio (cookie "idioma"), la lleva al paso 3 de /agenda en ese idioma.
      {
        source: "/pago-ok",
        has: [{ type: "cookie", key: "idioma", value: "en" }],
        destination: "/en/agenda?pago=ok",
        permanent: false,
      },
      { source: "/pago-ok", destination: "/es/agenda?pago=ok", permanent: false },
    ];
  },
};

export default nextConfig;
