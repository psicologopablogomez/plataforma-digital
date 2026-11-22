import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import MiEspacio from "@/components/MiEspacio";

// Es un área privada: no debe aparecer en los buscadores.
export const metadata: Metadata = { robots: { index: false, follow: false } };

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
      <h1 className="mb-8 text-center font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
        {t.miEspacio.titulo}
      </h1>
      <MiEspacio
        lang={lang}
        t={t.miEspacio}
        etapas={t.marca.etapas}
        regiones={t.servicios.tarifas.regiones}
        idiomas={t.agenda.form.idiomas}
      />
    </main>
  );
}
