"use client";

import { useEffect, useRef, useState } from "react";
import { ayudaCrisis, urlDirectorio } from "@/config/crisis";
import { EVENTO_ABRIR_CRISIS } from "@/lib/eventos";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Pais } from "@/lib/paises";

// Botón pequeño "Ayuda en crisis". La ventana SOLO se abre cuando alguien lo toca
// (o toca el enlace de ayuda dentro del test): nunca aparece sola.
export default function CrisisButton({
  lang,
  t,
  paises,
}: {
  lang: Locale;
  t: Dictionary["crisis"];
  paises: { principales: Pais[]; otros: Pais[] };
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [codigo, setCodigo] = useState("");

  // Otros botones (por ejemplo, el del test) pueden abrir esta misma ventana.
  useEffect(() => {
    const abrir = () => {
      if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
    };
    window.addEventListener(EVENTO_ABRIR_CRISIS, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_CRISIS, abrir);
  }, []);

  const pais = [...paises.principales, ...paises.otros].find((p) => p.code === codigo);
  const ayuda = codigo ? ayudaCrisis[codigo] : undefined;
  const enlaceExterno =
    "font-semibold text-azul underline underline-offset-2 hover:text-oscuro";

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="whitespace-nowrap rounded-full bg-naranja px-3 py-1.5 text-xs font-semibold text-oscuro shadow-sm hover:bg-turquesa"
      >
        {t.boton}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="crisis-titulo"
        className="m-auto max-h-[92vh] w-[min(92vw,28rem)] overflow-y-auto rounded-2xl p-0 shadow-2xl backdrop:bg-oscuro/60"
      >
        <div className="flex flex-col gap-4 p-6 text-texto">
          <h2 id="crisis-titulo" className="text-xl font-bold text-oscuro">
            {t.titulo}
          </h2>
          <p>{t.texto}</p>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            {t.elegirPais}
            <select
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="rounded-lg border border-oscuro/20 bg-white px-3 py-2 text-base font-normal"
            >
              <option value="">{t.elegirPais}</option>
              <optgroup label={t.principales}>
                {paises.principales.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t.otros}>
                {paises.otros.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          {/* Sin país elegido */}
          {!pais && (
            <p className="rounded-lg bg-turquesa/10 p-4 text-sm">{t.sinSeleccion}</p>
          )}

          {/* País con números verificados (Colombia, Australia, España) */}
          {pais && ayuda && (
            <div className="flex flex-col gap-3 rounded-lg bg-turquesa/10 p-4">
              <p className="text-sm">
                {t.emergencias}{" "}
                <a
                  href={`tel:${ayuda.emergencias}`}
                  className="text-lg font-bold text-oscuro underline"
                >
                  {ayuda.emergencias}
                </a>
              </p>
              <p className="text-sm font-semibold text-oscuro">{t.lineasTitulo}</p>
              <ul className="flex flex-col gap-3">
                {ayuda.lineas.map((l) => (
                  <li key={l.nombre} className="rounded-lg bg-white p-3">
                    <p className="font-semibold text-oscuro">{l.nombre}</p>
                    <a
                      href={`tel:${l.tel}`}
                      className="text-xl font-bold text-azul underline"
                      aria-label={`${t.llamar} ${l.nombre} ${l.telefono}`}
                    >
                      {l.telefono}
                    </a>
                    <p className="mt-1 text-sm text-texto/80">{l.descripcion[lang]}</p>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <a
                  href={urlDirectorio(pais.code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={enlaceExterno}
                >
                  {t.masLineas.replace("{pais}", pais.name)}
                </a>
              </p>
            </div>
          )}

          {/* Cualquier otro país: directorio internacional de líneas de ayuda */}
          {pais && !ayuda && (
            <div className="flex flex-col gap-2 rounded-lg bg-turquesa/10 p-4">
              <a
                href={urlDirectorio(pais.code)}
                target="_blank"
                rel="noopener noreferrer"
                className={enlaceExterno}
              >
                {t.directorio.replace("{pais}", pais.name)}
              </a>
              <p className="text-xs text-texto/70">{t.directorioNota}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="self-end rounded-full bg-azul px-5 py-2 text-sm font-semibold text-white hover:bg-oscuro"
          >
            {t.cerrar}
          </button>
        </div>
      </dialog>
    </>
  );
}
