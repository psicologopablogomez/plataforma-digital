import { notFound } from "next/navigation";
import { profesionales } from "@/config/profesionales";
import { getDictionary, isLocale } from "@/lib/i18n";
import ProfessionalCard from "@/components/ProfessionalCard";
import Seccion from "@/components/Seccion";

// Iconos sencillos para los 3 pilares: sentir, observar, pensar.
const iconos = [
  <path key="c" d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12C19 16.5 12 21 12 21Z" />,
  <g key="o">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </g>,
  <g key="r">
    <path d="M20 11a8 8 0 0 0-14.5-4M4 13a8 8 0 0 0 14.5 4" />
    <path d="M5 3v4h4M19 21v-4h-4" />
  </g>,
];

export default async function Nosotros({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const n = t.nosotros;

  return (
    <main>
      {/* 1. Quiénes somos */}
      <Seccion ancho="max-w-3xl">
        <div className="text-center">
          <h1 className="font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
            {n.quienes.titulo}
          </h1>
          <p className="mt-6 text-lg text-texto/80">{n.quienes.texto}</p>
        </div>
      </Seccion>

      {/* 2. Manifiesto: bloque visual con mucho espacio */}
      <section className="bg-gradient-to-br from-oscuro via-azul to-turquesa text-white">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest opacity-80">
            {n.manifiesto.titulo}
          </h2>
          <p className="font-editorial text-xl leading-relaxed sm:text-2xl">
            {n.manifiesto.texto}
          </p>
        </div>
      </section>

      {/* 3. Cómo trabajamos: 3 pilares */}
      <Seccion titulo={n.como.titulo}>
        <ul className="grid gap-6 md:grid-cols-3">
          {n.como.pilares.map((pilar, i) => (
            <li
              key={pilar.titulo}
              className="rounded-2xl border border-oscuro/10 p-6 text-center shadow-sm"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-turquesa/15 text-azul">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {iconos[i]}
                </svg>
              </span>
              <h3 className="text-lg font-bold text-oscuro">{pilar.titulo}</h3>
              <p className="mt-2 text-texto/80">{pilar.texto}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-texto/80">{n.como.nota}</p>
      </Seccion>

      {/* 4. Tu proceso en 3 etapas */}
      <Seccion titulo={n.proceso.titulo} fondo="suave">
        <ol className="grid gap-6 md:grid-cols-3">
          {n.proceso.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="mb-3 block text-sm font-bold text-azul">{i + 1}</span>
              <h3 className="font-editorial text-2xl font-bold text-oscuro">{etapa.titulo}</h3>
              <p className="mt-2 text-texto/80">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      {/* 5. Nuestros valores */}
      <Seccion titulo={n.valores.titulo}>
        <ul className="flex flex-wrap justify-center gap-3">
          {n.valores.items.map((valor) => (
            <li
              key={valor}
              className="rounded-full bg-gradient-to-r from-azul to-turquesa px-6 py-3 font-semibold text-white"
            >
              {valor}
            </li>
          ))}
        </ul>
      </Seccion>

      {/* 6. Quién te acompaña: hoy solo Juan Pablo, lista para sumar más */}
      <Seccion titulo={n.acompana.titulo} fondo="suave">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profesionales.map((p) => (
            <ProfessionalCard key={p.id} lang={lang} t={t} profesional={p} />
          ))}
        </div>
      </Seccion>
    </main>
  );
}
