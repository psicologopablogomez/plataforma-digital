import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { tituloPagina } from "@/lib/metadata";
import { listaPaises } from "@/lib/paises";
import MiEspacio from "@/components/MiEspacio";

// Es un área privada: no debe aparecer en los buscadores.
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return tituloPagina(params, (t) => t.miEspacio.titulo, {
    robots: { index: false, follow: false },
  } satisfies Metadata);
}

export default async function MiEspacioPagina({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="mb-8 text-center font-editorial text-3xl text-oscuro sm:text-5xl">
        {t.miEspacio.titulo}
      </h1>
      <MiEspacio
        lang={lang}
        t={t.miEspacio}
        etapas={t.marca.etapas}
        paises={listaPaises(lang)}
        idiomas={t.agenda.form.idiomas}
      />
    </main>
  );
}
