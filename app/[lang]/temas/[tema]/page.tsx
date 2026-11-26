import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profesionales, type EspecialidadId } from "@/config/profesionales";
import { frasesCriticas } from "@/config/temas";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import ChequeoTema from "@/components/ChequeoTema";

export const dynamicParams = false;

// Un chequeo por cada tema de "Temas que trabajamos": /es/temas/ansiedad, etc.
const temas = profesionales[0].especialidades;

export function generateStaticParams() {
  return locales.flatMap((lang) => temas.map((tema) => ({ lang, tema })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tema: string }>;
}): Promise<Metadata> {
  const { lang, tema } = await params;
  if (!isLocale(lang) || !temas.includes(tema as EspecialidadId)) return {};
  return { title: getDictionary(lang).especialidades[tema as EspecialidadId] };
}

export default async function Tema({
  params,
}: {
  params: Promise<{ lang: string; tema: string }>;
}) {
  const { lang, tema } = await params;
  if (!isLocale(lang) || !temas.includes(tema as EspecialidadId)) notFound();
  const id = tema as EspecialidadId;
  const t = getDictionary(lang);
  const c = t.temas;
  const contenido = c.items[id];

  return (
    <main>
      <section className="bg-gradient-to-br from-oscuro via-azul via-70% to-turquesa text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
          <Link href={`/${lang}`} className="text-sm font-semibold text-white/90 hover:text-turquesa hover:underline">
            ← {c.volver}
          </Link>
          <p className="mt-6 text-sm font-bold uppercase tracking-wide opacity-90">{c.titulo}</p>
          <h1 className="mt-2 font-editorial text-4xl sm:text-5xl">{t.especialidades[id]}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base opacity-95 sm:text-lg">{contenido.descripcion}</p>
        </div>
      </section>

      <section className="bg-fondo">
        <div className="px-4 py-12 sm:py-16">
          <ChequeoTema
            key={id}
            tema={t.especialidades[id]}
            preguntas={contenido.preguntas}
            resultados={contenido.resultados}
            criticas={frasesCriticas[id] ?? []}
            textos={c}
            hrefAgenda={`/${lang}/agenda`}
          />
          <p className="mt-10 text-center">
            <Link href={`/${lang}#temas`} className="text-sm font-semibold text-azul hover:text-oscuro hover:underline">
              {c.verTemas}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
