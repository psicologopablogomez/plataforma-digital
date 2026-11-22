import { notFound } from "next/navigation";
import { recursos } from "@/config/recursos";
import { fotoExiste } from "@/lib/fotos";
import { getDictionary, isLocale } from "@/lib/i18n";
import { tituloPagina } from "@/lib/metadata";
import Button from "@/components/Button";
import RecursosLista, { type TarjetaRecurso } from "@/components/RecursosLista";
import Seccion from "@/components/Seccion";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return tituloPagina(params, (t) => t.nav.recursos);
}

export default async function Recursos({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const r = t.recursos;

  const tarjetas: TarjetaRecurso[] = recursos.map((rec) => {
    const textos = r.items[rec.id];
    return {
      id: rec.id,
      tipo: rec.tipo,
      titulo: textos.titulo,
      linea: textos.linea,
      boton: textos.boton,
      etiquetas: rec.etiquetas.map((e) => t.etiquetas[e]),
      // La guía se puede descargar cuando su PDF ya está subido a /public/docs/
      descarga: rec.archivo && fotoExiste(rec.archivo) ? rec.archivo : undefined,
    };
  });

  return (
    <main>
      <Seccion ancho="max-w-3xl">
        <div className="text-center">
          <h1 className="font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
            {r.titulo}
          </h1>
          <p className="mt-4 text-lg text-texto/80">{r.texto}</p>
        </div>
      </Seccion>

      <Seccion fondo="suave">
        <RecursosLista
          tarjetas={tarjetas}
          filtros={r.filtros}
          tipos={r.tipos}
          pendiente={r.pendiente}
        />
        <p className="mt-8 text-center text-xs text-texto/70">{r.aviso}</p>
      </Seccion>

      <section className="bg-gradient-to-br from-oscuro via-azul to-turquesa text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center">
          <p className="font-editorial text-2xl font-bold sm:text-3xl">{r.cierre.texto}</p>
          <Button href={`/${lang}/agenda`} variante="acento">
            {r.cierre.boton}
          </Button>
        </div>
      </section>
    </main>
  );
}
