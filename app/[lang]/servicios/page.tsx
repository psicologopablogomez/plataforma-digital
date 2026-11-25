import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";
import { tituloPagina } from "@/lib/metadata";
import { whatsappHref } from "@/lib/whatsapp";
import Button, { estilosBoton } from "@/components/Button";
import Foto from "@/components/Foto";
import Relleno from "@/components/Relleno";
import Seccion from "@/components/Seccion";
import Tarifas from "@/components/Tarifas";

// Orden de los 4 tipos de terapia (también son los anclajes: /servicios#pareja).
const ids = ["individual", "pareja", "familiar", "migrantes"];

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return tituloPagina(params, (t) => t.nav.servicios);
}

export default async function Servicios({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const s = t.servicios;
  const base = `/${lang}`;
  const wa = whatsappHref(t.whatsapp.mensaje);

  return (
    <main>
      {/* 1. Introducción */}
      <Seccion ancho="max-w-3xl">
        <div className="text-center">
          <h1 className="font-editorial text-4xl text-oscuro sm:text-5xl">
            {s.intro.titulo}
          </h1>
          <p className="mt-6 text-lg text-texto/80">{s.intro.texto}</p>
        </div>
      </Seccion>

      {/* 2. Tipos de terapia */}
      <Seccion titulo={s.tipos.titulo} fondo="suave">
        <div className="grid gap-6 md:grid-cols-2">
          {s.tipos.items.map((item, n) => (
            <article
              key={item.titulo}
              id={ids[n]}
              className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <Foto
                ruta={`/images/servicios/${ids[n]}.jpg`}
                alt={item.titulo}
                className="h-44"
              />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <h3 className="text-xl font-bold text-oscuro">{item.titulo}</h3>
                  {item.subtitulo && (
                    <p className="text-sm font-medium text-azul">{item.subtitulo}</p>
                  )}
                </div>
                <p className="font-editorial text-lg text-oscuro">“{item.tension}”</p>
                <p className="text-texto/80">{item.texto}</p>
                <div className="mt-auto pt-2">
                  <Button href={`${base}/agenda`}>{s.tipos.agendar}</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Seccion>

      {/* 3. Cómo avanzas */}
      <Seccion titulo={s.avanzas.titulo}>
        <div className="grid gap-6 md:grid-cols-3">
          {s.avanzas.items.map((item, n) => (
            <article
              key={item.titulo}
              id={n === 0 ? "escucha" : undefined}
              className="flex scroll-mt-24 flex-col gap-3 rounded-2xl border border-oscuro/10 p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-azul font-bold text-white">
                {n + 1}
              </span>
              <h3 className="text-lg font-bold text-oscuro">{item.titulo}</h3>
              <p className="text-texto/80">{item.texto}</p>
              {item.boton && (
                <div className="mt-auto pt-2">
                  <Button
                    href={n === 0 ? `${base}/agenda#escucha` : `${base}/agenda`}
                    variante={n === 0 ? "contorno" : "principal"}
                    className="w-full"
                  >
                    {item.boton}
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      </Seccion>

      {/* 4. Tarifas por región */}
      <section id="tarifas" className="scroll-mt-24 bg-turquesa/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <h2 className="mb-8 text-center font-editorial text-2xl text-oscuro sm:text-3xl">
            {s.tarifas.titulo}
          </h2>
          <Tarifas
            lang={lang}
            precios={site.prices}
            t={s.tarifas}
            inicial={lang === "en" ? "AU" : "CO"}
          />
        </div>
      </section>

      {/* 5. Espacios de escucha breve para miembros */}
      <Seccion ancho="max-w-3xl">
        <div className="rounded-2xl bg-gradient-to-br from-oscuro to-azul p-8 text-white sm:p-10">
          <h2 className="font-editorial text-2xl sm:text-3xl">{s.escucha.titulo}</h2>
          <p className="mt-4 leading-relaxed opacity-95">
            <Relleno texto={s.escucha.texto} />
          </p>
        </div>
      </Seccion>

      {/* 6. Talleres y eventos */}
      <Seccion titulo={s.talleres.titulo} fondo="suave" ancho="max-w-3xl">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-lg text-texto/80">{s.talleres.texto}</p>
          <Button href={`${base}/eventos`} variante="contorno">
            {s.talleres.boton}
          </Button>
        </div>
      </Seccion>

      {/* 7. Cierre */}
      <section className="bg-gradient-to-br from-oscuro via-azul via-70% to-turquesa text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center">
          <p className="font-editorial text-2xl sm:text-3xl">{s.cierre.texto}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`${base}/agenda#escucha`} variante="acento">
              {s.cierre.escucha}
            </Button>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={estilosBoton("contornoClaro")}
              >
                {s.cierre.whatsapp}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={site.whatsapp}
                className={estilosBoton("contornoClaro", "cursor-not-allowed opacity-70")}
              >
                {s.cierre.whatsapp}
              </span>
            )}
          </div>
          {!wa && (
            <p className="text-xs">
              <Relleno texto={site.whatsapp} />
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
