import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, pageSlugs } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => pageSlugs.map((page) => ({ lang, page })));
}

const legales = [
  "aviso-de-privacidad",
  "terminos-y-condiciones",
  "politica-de-cancelacion",
  "consentimiento-informado",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}): Promise<Metadata> {
  const { lang, page } = await params;
  if (!isLocale(lang)) return {};
  const titulo = (getDictionary(lang).paginas as Record<string, string>)[page];
  return titulo ? { title: titulo } : {};
}

// Página provisional: sirve para que todo el menú sea navegable.
// Cada una se reemplaza por su versión completa en los pasos siguientes.
export default async function PaginaProvisional({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}) {
  const { lang, page } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const titulo = (t.paginas as Record<string, string>)[page];
  if (!titulo) notFound();

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col gap-4 px-4 py-16">
      <h1 className="text-3xl font-bold text-oscuro">{titulo}</h1>
      <p className="text-texto/80">
        {legales.includes(page) ? t.pendiente.textoLegal : t.pendiente.enConstruccion}
      </p>
    </main>
  );
}
