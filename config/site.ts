// Aquí viven el nombre, los precios, los enlaces y las líneas de crisis.
// Todo lo que diga [[POR DEFINIR: ...]] es un dato que todavía no tenemos:
// se muestra como texto de relleno visible. No inventar datos.

export const site = {
  name: "Senderomente", // provisional: puede cambiar a "Sendera"
  domain: "[[POR DEFINIR: dominio]]", // preferido: senderomente.com (no comprado aún)
  email: "contacto@[[dominio]]",
  whatsapp: "[[POR DEFINIR: número de WhatsApp Business]]",
  sessionMinutes: 50,

  // Precios por región. Cuando un valor no está definido, es un texto de relleno.
  prices: {
    CO: { currency: "COP", first: 100000, member4: 360000, member8: 700000 },
    AU: { currency: "AUD", first: 45, member4: 165, member8: 315 },
    LATAM: {
      currency: "USD",
      first: 25,
      member4: "[[POR DEFINIR]]",
      member8: "[[POR DEFINIR]]",
    },
  },

  // Espacios de escucha breve para miembros
  tokens: { perWeek: 2, minutes: 10, extraPrice: "[[POR DEFINIR]]" },

  // Enlaces que se conectarán en la Fase 1 (Calendly, Stripe y redes)
  links: {
    calendlyEscucha: "[[POR DEFINIR]]", // escucha breve gratuita, 10 min
    calendlyPrimera: "[[POR DEFINIR]]", // primera cita, 50 min
    calendlyMiembro: "[[POR DEFINIR]]", // sesiones de membresía
    calendlyToken: "[[POR DEFINIR]]", // escucha breve (solo miembros)
    stripePrimera: {
      CO: "[[POR DEFINIR]]",
      AU: "[[POR DEFINIR]]",
      LATAM: "[[POR DEFINIR]]",
    },
    stripeMember4: {
      CO: "[[POR DEFINIR]]",
      AU: "[[POR DEFINIR]]",
      LATAM: "[[POR DEFINIR]]",
    },
    stripeMember8: {
      CO: "[[POR DEFINIR]]",
      AU: "[[POR DEFINIR]]",
      LATAM: "[[POR DEFINIR]]",
    },
    facebook: "[[POR DEFINIR]]",
    instagram: "[[POR DEFINIR]]",
    tiktok: "[[POR DEFINIR]]",
  },

  // Líneas de ayuda en crisis. Juan Pablo enviará los números oficiales.
  crisisLines: {
    AU: "[[POR DEFINIR]]",
    CO: "[[POR DEFINIR]]",
    ES: "[[POR DEFINIR]]",
  },
} as const;

export type Site = typeof site;
