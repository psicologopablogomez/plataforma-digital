// Aquí viven el nombre, los precios, los enlaces y las líneas de crisis.
// Todo lo que diga [[POR DEFINIR: ...]] es un dato que todavía no tenemos:
// se muestra como texto de relleno visible. No inventar datos.

export const site = {
  name: "Senderomente", // provisional: puede cambiar a "Sendera"
  domain: "senderomente.com",
  email: "contacto@senderomente.com",
  whatsapp: "+61404712121", // WhatsApp Business
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

  // Enlaces de la Fase 1: agenda (Cal.com), pagos (Stripe) y redes
  links: {
    agendaEscucha: "https://cal.com/senderomente/escucha-gratuita", // escucha gratuita, 10 min
    agendaPrimera: "https://cal.com/senderomente/primera-cita", // primera cita, 50 min
    // Las dos citas de MIEMBROS (sesión de membresía y espacio de escucha) ya existen
    // en Cal.com, pero NO se conectan al sitio hasta que Mi espacio exija inicio de
    // sesión (Fase 2): si no, cualquiera podría reservarlas sin ser miembro.
    agendaMiembro: "[[POR DEFINIR]]", // sesiones de membresía
    agendaEscuchaMiembros: "[[POR DEFINIR]]", // escucha breve (solo miembros)
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
    facebook: "https://www.facebook.com/people/Senderomente/61596785103836/",
    instagram: "https://www.instagram.com/senderomente/",
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
