"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EVENTO_ABRIR_CRISIS, EVENTO_ABRIR_TEST } from "@/lib/eventos";
import type { Locale } from "@/lib/i18n";
import type { Area, ServicioId, TestData } from "@/lib/test";

type Paso = "entrada" | "resultado" | number;

const COOKIE_VISTO = "test_visto";
const HORAS_SIN_VOLVER = 24; // tras verlo, no vuelve a salir solo en este navegador durante 24 horas
const SEGUNDOS_PARA_APARECER = 8;

// Páginas donde NO debe salir solo: la persona está reservando o en su área privada.
const RUTAS_SIN_AVISO = /\/(agenda|mi-espacio|pago-ok)(\/|$)/;

// Se recuerda con una cookie (dura entre pestañas y visitas), y además en memoria
// mientras la página siga abierta, por si el navegador bloquea las cookies.
let vistoEnMemoria = false;

function yaLoVio(): boolean {
  if (vistoEnMemoria) return true;
  try {
    return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_VISTO}=`));
  } catch {
    return false;
  }
}

function marcarVisto() {
  vistoEnMemoria = true;
  try {
    document.cookie = `${COOKIE_VISTO}=1; path=/; max-age=${HORAS_SIN_VOLVER * 3600}; SameSite=Lax`;
  } catch {
    // Sin cookies: queda solo la marca en memoria.
  }
}

// Test de orientación (esquema 7.2): 4 preguntas, resultado por área.
// Es una orientación, no un diagnóstico. No se guarda ninguna respuesta.
export default function TestModal({
  lang,
  test,
  servicios,
  crisisLabel,
}: {
  lang: Locale;
  test: TestData;
  servicios: Record<ServicioId, string>;
  crisisLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [paso, setPaso] = useState<Paso>("entrada");
  const [respuestas, setRespuestas] = useState<number[]>([]);

  const abrir = useCallback(() => {
    setPaso("entrada");
    setRespuestas([]);
    marcarVisto();
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, []);

  const cerrar = () => dialogRef.current?.close();

  useEffect(() => {
    window.addEventListener(EVENTO_ABRIR_TEST, abrir);

    // Sale solo una vez al entrar al sitio. Se comprueba al cargar y otra vez justo
    // antes de aparecer, y nunca se muestra encima de otra ventana abierta.
    const temporizador = yaLoVio()
      ? undefined
      : window.setTimeout(() => {
          if (yaLoVio()) return;
          if (RUTAS_SIN_AVISO.test(window.location.pathname)) return;
          if (document.querySelector("dialog[open]")) return;
          abrir();
        }, SEGUNDOS_PARA_APARECER * 1000);

    return () => {
      window.removeEventListener(EVENTO_ABRIR_TEST, abrir);
      if (temporizador) window.clearTimeout(temporizador);
    };
  }, [abrir]);

  const total = test.preguntas.length;

  const elegir = (indice: number) => {
    if (typeof paso !== "number") return;
    const nuevas = [...respuestas.slice(0, paso), indice];
    setRespuestas(nuevas);
    setPaso(paso + 1 < total ? paso + 1 : "resultado");
  };

  const atras = () => {
    if (typeof paso !== "number") return;
    setPaso(paso === 0 ? "entrada" : paso - 1);
  };

  // Resultado: el área sale de la pregunta 1; el servicio, de la pregunta 2
  // (si el área es "vivir lejos de casa", se sugiere el acompañamiento a migrantes).
  const area: Area =
    test.preguntas[0].opciones[respuestas[0]]?.area ?? "A";
  const servicio: ServicioId =
    area === "D"
      ? "migrantes"
      : (test.preguntas[1].opciones[respuestas[1]]?.servicio ?? "individual");
  const alerta = Boolean(test.preguntas[total - 1].opciones[respuestas[total - 1]]?.alerta);
  const base = `/${lang}`;

  const pregunta = typeof paso === "number" ? test.preguntas[paso] : undefined;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Test"
      className="m-auto max-h-[92vh] w-[min(94vw,32rem)] overflow-y-auto rounded-2xl p-0 shadow-2xl backdrop:bg-oscuro/60"
    >
      <div className="relative flex flex-col gap-5 p-6 pt-12 text-texto">
        <button
          type="button"
          onClick={cerrar}
          aria-label={test.ui.cerrar}
          className="absolute right-3 top-3 rounded-full p-2 text-oscuro hover:bg-oscuro hover:text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {paso === "entrada" && (
          <>
            <p className="text-xl font-bold text-oscuro">{test.entrada.texto}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setPaso(0)}
                className="rounded-full bg-azul px-6 py-3 font-semibold text-white hover:bg-oscuro"
              >
                {test.entrada.empezar}
              </button>
              <button
                type="button"
                onClick={cerrar}
                className="rounded-full px-6 py-3 font-semibold text-azul hover:bg-azul hover:text-white"
              >
                {test.entrada.ahoraNo}
              </button>
            </div>
          </>
        )}

        {pregunta && typeof paso === "number" && (
          <>
            <div>
              <p className="mb-2 text-sm font-semibold text-azul">
                {test.ui.pregunta} {paso + 1} {test.ui.de} {total}
              </p>
              <div className="h-1.5 w-full rounded-full bg-oscuro/10" aria-hidden="true">
                <div
                  className="h-1.5 rounded-full bg-azul"
                  style={{ width: `${((paso + 1) / total) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xl font-bold text-oscuro">{pregunta.texto}</p>
            <div className="flex flex-col gap-2">
              {pregunta.opciones.map((opcion, n) => (
                <button
                  key={opcion.texto}
                  type="button"
                  onClick={() => elegir(n)}
                  aria-pressed={respuestas[paso] === n}
                  className="rounded-xl border border-oscuro/15 px-4 py-3 text-left font-medium hover:border-azul hover:bg-azul hover:text-white"
                >
                  {opcion.texto}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={atras}
              className="self-start text-sm font-semibold text-azul hover:text-oscuro hover:underline"
            >
              ← {test.ui.atras}
            </button>
          </>
        )}

        {paso === "resultado" && (
          <>
            <h2 className="font-editorial text-2xl text-oscuro">
              {test.resultados[area].titulo}
            </h2>
            <p className="text-lg">{test.resultados[area].texto}</p>

            <p className="rounded-xl bg-turquesa/10 p-4 text-sm">
              <span className="font-semibold text-oscuro">{test.ui.servicioSugerido}: </span>
              <Link
                href={`${base}/servicios#${servicio}`}
                onClick={cerrar}
                className="font-semibold text-azul hover:text-oscuro hover:underline"
              >
                {servicios[servicio]}
              </Link>
            </p>

            {alerta && (
              <p className="rounded-xl bg-naranja/15 p-4 text-sm font-medium text-oscuro">
                {test.avisoAlerta}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Link
                href={`${base}/agenda`}
                onClick={cerrar}
                className="rounded-full bg-azul px-6 py-3 text-center font-semibold text-white hover:bg-oscuro"
              >
                {test.botones.primeraCita}
              </Link>
              <Link
                href={`${base}/servicios#escucha`}
                onClick={cerrar}
                className="rounded-full border border-azul px-6 py-3 text-center font-semibold text-azul hover:bg-azul hover:text-white"
              >
                {test.botones.escucha}
              </Link>
              <Link
                href={`${base}/recursos`}
                onClick={cerrar}
                className="rounded-full px-6 py-3 text-center font-semibold text-azul hover:bg-azul hover:text-white"
              >
                {test.botones.recursos}
              </Link>
            </div>
            <p className="text-xs text-texto/70">{test.aviso}</p>
          </>
        )}

        {/* Siempre visible dentro del test: acceso a la ayuda en crisis */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_CRISIS))}
          className="self-center text-sm font-semibold text-oscuro underline"
        >
          {crisisLabel}
        </button>
      </div>
    </dialog>
  );
}
