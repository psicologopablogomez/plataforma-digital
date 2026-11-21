"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { isPlaceholder, type Dictionary } from "@/lib/i18n";

type Pais = keyof typeof site.crisisLines;

// Botón siempre visible. Abre una ventana con las líneas de ayuda del país elegido.
export default function CrisisButton({ t }: { t: Dictionary["crisis"] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pais, setPais] = useState<Pais>("AU");
  const linea: string = site.crisisLines[pais];

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="whitespace-nowrap rounded-full bg-naranja px-3 py-2 text-xs font-bold text-oscuro shadow-sm hover:brightness-95 sm:px-4 sm:text-sm"
      >
        {t.boton}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="crisis-titulo"
        className="m-auto w-[min(92vw,28rem)] rounded-2xl p-0 shadow-2xl backdrop:bg-oscuro/60"
      >
        <div className="flex flex-col gap-4 p-6 text-texto">
          <h2 id="crisis-titulo" className="text-xl font-bold text-oscuro">
            {t.titulo}
          </h2>
          <p>{t.texto}</p>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            {t.elegirPais}
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value as Pais)}
              className="rounded-lg border border-oscuro/20 bg-white px-3 py-2 text-base font-normal"
            >
              {(Object.keys(site.crisisLines) as Pais[]).map((p) => (
                <option key={p} value={p}>
                  {t.paises[p]}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-lg bg-turquesa/10 p-4">
            <p className="text-sm font-semibold text-oscuro">{t.linea}</p>
            <p
              className={
                isPlaceholder(linea)
                  ? "mt-1 font-mono text-sm text-naranja"
                  : "mt-1 text-lg font-bold"
              }
            >
              {linea}
            </p>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="self-end rounded-full bg-azul px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            {t.cerrar}
          </button>
        </div>
      </dialog>
    </>
  );
}
