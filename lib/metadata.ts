import type { Metadata } from "next";
import { getDictionary, isLocale, type Dictionary } from "@/lib/i18n";

// Título de la pestaña de cada página: "Servicios · Senderomente" (la plantilla
// con el nombre se define en app/[lang]/layout.tsx).
export async function tituloPagina(
  params: Promise<{ lang: string }>,
  elegir: (t: Dictionary) => string,
  extra: Metadata = {},
): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return extra;
  return { title: elegir(getDictionary(lang)), ...extra };
}
