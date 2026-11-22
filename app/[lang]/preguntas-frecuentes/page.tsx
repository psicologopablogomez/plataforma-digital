import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { tituloPagina } from "@/lib/metadata";
import Relleno from "@/components/Relleno";
import Seccion from "@/components/Seccion";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return tituloPagina(params, (t) => t.nav.preguntas);
}

export default async function PreguntasFrecuentes({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main>
      <Seccion ancho="max-w-3xl">
        <h1 className="mb-8 text-center font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
          {t.paginas["preguntas-frecuentes"]}
        </h1>
        <div className="flex flex-col gap-3">
          {t.faq.items.map((item) => (
            <details
              key={item.p}
              className="rounded-xl border border-oscuro/10 bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-semibold text-oscuro marker:hidden">
                {item.p}
              </summary>
              <p className="mt-3 text-texto/80">
                <Relleno texto={item.r} />
              </p>
            </details>
          ))}
        </div>
      </Seccion>
    </main>
  );
}
