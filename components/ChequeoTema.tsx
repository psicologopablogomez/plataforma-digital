"use client";

import { useState } from "react";
import Link from "next/link";
import { EVENTO_ABRIR_CRISIS } from "@/lib/eventos";
import { UMBRAL_AMARILLO, UMBRAL_ROJO, type Color } from "@/config/temas";
import { estilosBoton } from "@/components/Button";

type Textos = {
  checkTitulo: string;
  checkIntro: string;
  boton: string;
  reiniciar: string;
  marcadas: string;
  de: string;
  resultadoTitulo: string;
  aviso: string;
  crisisTexto: string;
  crisisBoton: string;
  resumen: string;
  resumenCritica: string;
  indicacionesTitulo: string;
  semaforo: Record<Color, { nombre: string; titulo: string }>;
  indicaciones: Record<Color, string[]>;
  cta: { titulo: string; textos: Record<Color, string>; boton: string };
};

// Los textos llevan marcas como {tema} y {n} que se reemplazan con los datos de cada persona.
function llenar(texto: string, datos: Record<string, string | number>) {
  return texto.replace(/\{(\w+)\}/g, (_, k) => String(datos[k] ?? ""));
}

// Colores del semáforo (se reconocen por el color y también por el nombre escrito).
const luz: Record<Color, { fondo: string; apagado: string; borde: string }> = {
  verde: { fondo: "bg-[#2e9e5b]", apagado: "bg-[#2e9e5b]/20", borde: "border-[#2e9e5b]" },
  amarillo: { fondo: "bg-[#f2b705]", apagado: "bg-[#f2b705]/25", borde: "border-[#f2b705]" },
  rojo: { fondo: "bg-[#d64545]", apagado: "bg-[#d64545]/20", borde: "border-[#d64545]" },
};
const orden: Color[] = ["rojo", "amarillo", "verde"];

export default function ChequeoTema({
  tema,
  preguntas,
  resultados,
  criticas,
  textos,
  hrefAgenda,
}: {
  tema: string;
  preguntas: string[];
  resultados: Record<Color, string>;
  criticas: number[];
  textos: Textos;
  hrefAgenda: string;
}) {
  const [marcadas, setMarcadas] = useState<boolean[]>(() => preguntas.map(() => false));
  const [resultado, setResultado] = useState<Color | null>(null);

  const total = marcadas.filter(Boolean).length;
  const critica = criticas.some((n) => marcadas[n]);

  function calcular() {
    const color: Color = critica || total >= UMBRAL_ROJO ? "rojo" : total >= UMBRAL_AMARILLO ? "amarillo" : "verde";
    setResultado(color);
    // Lleva la vista al resultado para que no quede escondido debajo.
    setTimeout(() => document.getElementById("resultado-semaforo")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  function reiniciar() {
    setMarcadas(preguntas.map(() => false));
    setResultado(null);
  }

  const r = resultado ? textos.semaforo[resultado] : null;
  // El tema va en minúscula dentro de las frases ("con ansiedad", "con duelo y pérdidas").
  const datos = { tema: tema.toLowerCase(), n: total, total: preguntas.length };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-editorial text-2xl text-oscuro sm:text-3xl">{textos.checkTitulo}</h2>
      <p className="mt-2 text-texto/80">{textos.checkIntro}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {preguntas.map((p, n) => (
          <li key={p}>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                marcadas[n] ? "border-azul bg-azul/10" : "border-oscuro/15 bg-white hover:border-azul hover:bg-azul/5"
              }`}
            >
              <input
                type="checkbox"
                checked={marcadas[n]}
                onChange={(e) => {
                  setMarcadas((prev) => prev.map((v, i) => (i === n ? e.target.checked : v)));
                  setResultado(null);
                }}
                className="mt-1 h-5 w-5 shrink-0 accent-[#1b7a8c]"
              />
              <span className="text-texto">{p}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={calcular} className={estilosBoton("principal")}>
          {textos.boton}
        </button>
        <span className="text-sm text-texto/70">
          {total} {textos.de} {preguntas.length} {textos.marcadas}
        </span>
        {resultado && (
          <button type="button" onClick={reiniciar} className="text-sm font-semibold text-azul hover:text-oscuro hover:underline">
            {textos.reiniciar}
          </button>
        )}
      </div>

      {resultado && r && (
        <section id="resultado-semaforo" aria-live="polite" className="mt-10 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <h3 className="text-center text-sm font-bold uppercase tracking-wide text-texto/70">
            {textos.resultadoTitulo}
          </h3>

          <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Semáforo: la luz encendida es la de tu resultado */}
            <div className="flex shrink-0 flex-col gap-3 rounded-2xl bg-oscuro p-4" role="img" aria-label={r.nombre}>
              {orden.map((c) => (
                <span
                  key={c}
                  className={`block h-12 w-12 rounded-full ${
                    c === resultado ? `${luz[c].fondo} ring-4 ring-white/70` : `${luz[c].apagado}`
                  }`}
                />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className={`inline-block rounded-full border-2 px-3 py-0.5 text-sm font-bold text-oscuro ${luz[resultado].borde}`}>
                {r.nombre}
              </p>
              <h4 className="mt-2 font-editorial text-2xl text-oscuro">{llenar(r.titulo, datos)}</h4>
              <p className="mt-2 text-sm font-semibold text-azul">
                {llenar(textos.resumen, datos)} {critica && textos.resumenCritica}
              </p>
              <p className="mt-2 text-texto/90">{resultados[resultado]}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-oscuro/10 p-5">
            <p className="font-bold text-oscuro">{textos.indicacionesTitulo}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {textos.indicaciones[resultado].map((i) => (
                <li key={i} className="flex gap-3 text-texto/90">
                  <span aria-hidden="true" className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${luz[resultado].fondo}`} />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>

          {resultado === "rojo" && critica && (
            <p className="mt-6 rounded-xl bg-[#d64545]/10 p-4 text-sm text-oscuro">
              {textos.crisisTexto}{" "}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_CRISIS))}
                className="font-bold text-azul underline underline-offset-2 hover:text-oscuro"
              >
                {textos.crisisBoton}
              </button>
            </p>
          )}

          <div className="mt-8 rounded-xl bg-turquesa/10 p-5 text-center">
            <p className="font-bold text-oscuro">{textos.cta.titulo}</p>
            <p className="mt-1 text-texto/80">{llenar(textos.cta.textos[resultado], datos)}</p>
            <Link href={hrefAgenda} className={estilosBoton("acento", "mt-4")}>
              {textos.cta.boton}
            </Link>
          </div>

          <p className="mt-5 text-xs text-texto/70">{textos.aviso}</p>
        </section>
      )}
    </div>
  );
}
