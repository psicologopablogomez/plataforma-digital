import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Button from "@/components/Button";
import Relleno from "@/components/Relleno";

// Página de inicio (esquema 6.1). Las fotos las sube Juan Pablo a
// /public/images/inicio/: mientras tanto se usan fondos de color.

// A qué parte de Servicios lleva cada frase (en el mismo orden del texto).
const anclasServicios = ["individual", "pareja", "familiar", "migrantes"];

function Seccion({
  titulo,
  children,
  fondo = "blanco",
}: {
  titulo?: string;
  children: React.ReactNode;
  fondo?: "blanco" | "suave";
}) {
  return (
    <section className={fondo === "suave" ? "bg-turquesa/10" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        {titulo && (
          <h2 className="mb-8 text-center text-2xl font-bold text-oscuro sm:text-3xl">
            {titulo}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const i = t.inicio;
  const base = `/${lang}`;

  return (
    <main>
      {/* 1. Portada: abre con la filosofía y la promesa */}
      <section className="bg-gradient-to-br from-oscuro via-azul to-turquesa text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          <h1 className="font-editorial text-4xl font-bold leading-tight sm:text-6xl">
            {t.marca.filosofia}
          </h1>
          <p className="max-w-2xl text-lg opacity-95 sm:text-xl">{t.marca.promesa}</p>
          <p className="text-base font-medium opacity-90">{i.hero.apoyo}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href={`${base}/agenda`} variante="acento">
              {i.hero.botonPrincipal}
            </Button>
            {/* El test emergente se conecta en el paso 3 */}
            <Button href={`${base}/recursos`} variante="contornoClaro">
              {i.hero.botonSecundario}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. ¿Te suena alguna de estas frases? */}
      <Seccion titulo={i.frases.titulo}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {i.frases.items.map((frase, n) => (
            <li key={frase}>
              <Link
                href={`${base}/servicios#${anclasServicios[n]}`}
                className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-oscuro to-azul p-6 text-center font-editorial text-xl text-white shadow-sm hover:brightness-110"
              >
                “{frase}”
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-texto/80">
          {i.frases.cierre}
        </p>
      </Seccion>

      {/* 3. Cómo funciona */}
      <Seccion titulo={i.comoFunciona.titulo} fondo="suave">
        <ol className="grid gap-6 md:grid-cols-3">
          {i.comoFunciona.pasos.map((paso, n) => (
            <li key={paso.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-azul text-lg font-bold text-white">
                {n + 1}
              </span>
              <h3 className="text-lg font-bold text-oscuro">{paso.titulo}</h3>
              <p className="mt-2 text-texto/80">{paso.texto}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-lg font-semibold text-oscuro">
          {t.marca.etapas.join(" · ")}. {t.marca.lema}
        </p>
      </Seccion>

      {/* 4. En qué te acompañamos */}
      <Seccion titulo={i.acompanamos.titulo}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {i.acompanamos.items.map((item, n) => (
            <li key={item.titulo}>
              <Link
                href={`${base}/servicios#${anclasServicios[n]}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-oscuro/10 bg-white shadow-sm hover:shadow-md"
              >
                <div className="h-32 bg-gradient-to-br from-turquesa to-azul" aria-hidden="true" />
                <div className="flex flex-1 flex-col gap-1 p-5">
                  <h3 className="text-lg font-bold text-oscuro group-hover:text-azul">
                    {item.titulo}
                  </h3>
                  {item.subtitulo && (
                    <p className="text-sm font-medium text-azul">{item.subtitulo}</p>
                  )}
                  <p className="mt-1 text-sm text-texto/80">“{item.linea}”</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* 5. Temas que trabajamos */}
      <Seccion titulo={i.temas.titulo} fondo="suave">
        <ul className="flex flex-wrap justify-center gap-3">
          {i.temas.items.map((tema) => (
            <li
              key={tema}
              className="rounded-full border border-azul/30 bg-white px-4 py-2 text-sm font-medium text-oscuro"
            >
              {tema}
            </li>
          ))}
        </ul>
      </Seccion>

      {/* 6. Quién te acompaña */}
      <Seccion titulo={i.quien.titulo}>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-oscuro/10 p-8 text-center shadow-sm">
          {/* Aquí va la foto: /public/images/nosotros/juan-pablo.jpg */}
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-azul to-turquesa text-3xl font-bold text-white"
            aria-hidden="true"
          >
            JP
          </div>
          <div>
            <h3 className="text-xl font-bold text-oscuro">{i.quien.nombre}</h3>
            <p className="mt-1 text-sm font-medium text-azul">{i.quien.cargo}</p>
            <p className="mt-1 text-sm text-texto/70">
              <Relleno texto={i.quien.estudios} />
            </p>
          </div>
          <p className="font-editorial text-xl text-oscuro">“{i.quien.frase}”</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* El perfil completo se crea en el paso 4 */}
            <Button href={`${base}/nosotros`} variante="contorno">
              {i.quien.perfil}
            </Button>
            <Button href={`${base}/agenda`}>{i.quien.agendar}</Button>
          </div>
        </div>
      </Seccion>

      {/* 7. Recursos gratuitos */}
      <Seccion titulo={i.recursos.titulo} fondo="suave">
        <ul className="grid gap-4 md:grid-cols-3">
          {i.recursos.items.map((item) => (
            <li
              key={item.titulo}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm"
            >
              <span className="w-fit rounded-full bg-turquesa/20 px-3 py-1 text-xs font-bold uppercase text-oscuro">
                {item.tipo}
              </span>
              <h3 className="text-lg font-bold text-oscuro">{item.titulo}</h3>
              {item.linea && <p className="text-sm text-texto/80">{item.linea}</p>}
              <div className="mt-auto pt-2">
                <Button href={`${base}/recursos`} variante="contorno" className="w-full">
                  {item.boton}
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm">
          <Relleno texto={i.recursos.pendiente} />
        </p>
        <div className="mt-6 text-center">
          <Button href={`${base}/recursos`}>{i.recursos.todos}</Button>
        </div>
      </Seccion>

      {/* 8. Próximo evento (sin ventana emergente) */}
      <Seccion titulo={i.evento.titulo}>
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-gradient-to-br from-oscuro to-azul p-8 text-white">
          <h3 className="font-editorial text-2xl font-bold">{i.evento.nombre}</h3>
          <p className="opacity-90">{i.evento.texto}</p>
          <p className="text-sm">
            <span className="font-semibold">{i.evento.etiquetaFecha}:</span>{" "}
            <Relleno texto={i.evento.fecha} />
            {" · "}
            <span className="font-semibold">{i.evento.etiquetaCosto}:</span>{" "}
            {i.evento.costo}
          </p>
          <div>
            <Button href={`${base}/eventos`} variante="acento">
              {i.evento.boton}
            </Button>
          </div>
        </div>
      </Seccion>

      {/* 9. Preguntas frecuentes (las 4 más importantes) */}
      <Seccion titulo={i.faq.titulo} fondo="suave">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {i.faq.items.map((item) => (
            <details
              key={item.p}
              className="group rounded-xl bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-semibold text-oscuro marker:hidden">
                {item.p}
              </summary>
              <p className="mt-3 text-texto/80">{item.r}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button href={`${base}/preguntas-frecuentes`} variante="contorno">
            {i.faq.todas}
          </Button>
        </div>
      </Seccion>

      {/* 10. Cierre */}
      <section className="bg-gradient-to-br from-oscuro via-azul to-turquesa text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center">
          <p className="font-editorial text-3xl font-bold sm:text-4xl">{t.marca.cierre}</p>
          <Button href={`${base}/agenda`} variante="acento">
            {i.cierre.boton}
          </Button>
        </div>
      </section>
    </main>
  );
}
