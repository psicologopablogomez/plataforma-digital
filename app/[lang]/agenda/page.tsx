import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";
import AgendaFlow from "@/components/AgendaFlow";
import RecuadroAgenda from "@/components/RecuadroAgenda";

export default async function Agenda({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.agenda;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
          {a.titulo}
        </h1>
        <p className="mt-4 text-lg text-texto/80">{a.texto}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <AgendaFlow lang={lang} t={a} regiones={t.servicios.tarifas.regiones} />

        <aside
          id="escucha"
          className="h-fit scroll-mt-24 rounded-2xl bg-gradient-to-br from-oscuro to-azul p-6 text-white lg:sticky lg:top-24"
        >
          <RecuadroAgenda t={a.lateral} wa={whatsappHref(t.whatsapp.mensaje)} />
        </aside>
      </div>
    </main>
  );
}
