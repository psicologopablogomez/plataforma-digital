import es from "@/content/es.json";
import en from "@/content/en.json";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

// El inglés debe tener exactamente las mismas claves que el español.
export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

// Un valor "[[POR DEFINIR...]]" es un dato pendiente: se muestra como relleno.
export function isPlaceholder(value: string): boolean {
  return value.includes("[[");
}

// Páginas del menú y páginas fuera del menú que ya existen como ruta.
export const pageSlugs = [
  "servicios",
  "recursos",
  "eventos",
  "preguntas-frecuentes",
  "contacto",
  "agenda",
  "mi-espacio",
  "aviso-de-privacidad",
  "terminos-y-condiciones",
  "politica-de-cancelacion",
  "consentimiento-informado",
] as const;
