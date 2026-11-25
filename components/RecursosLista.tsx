"use client";

import { useState } from "react";
import AbrirTestButton from "./AbrirTestButton";
import { estilosBoton } from "./Button";
import Relleno from "./Relleno";

type Filtro = "todos" | "test" | "guia";

export type TarjetaRecurso = {
  id: string;
  tipo: "test" | "guia";
  titulo: string;
  linea: string;
  boton: string;
  etiquetas: string[];
  // Solo guías: ruta del PDF si ya está subido a /public/docs/
  descarga?: string;
};

// Tarjetas de recursos con pestañas Todos · Tests · Guías (esquema 6.4 y 7.5).
export default function RecursosLista({
  tarjetas,
  filtros,
  tipos,
  pendiente,
}: {
  tarjetas: TarjetaRecurso[];
  filtros: { todos: string; tests: string; guias: string };
  tipos: { test: string; guia: string };
  pendiente: string;
}) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const visibles = tarjetas.filter((t) => filtro === "todos" || t.tipo === filtro);
  const hayPendientes = visibles.some((t) => t.tipo === "guia" && !t.descarga);

  const pestanas: { id: Filtro; texto: string }[] = [
    { id: "todos", texto: filtros.todos },
    { id: "test", texto: filtros.tests },
    { id: "guia", texto: filtros.guias },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist">
        {pestanas.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={filtro === p.id}
            onClick={() => setFiltro(p.id)}
            className={
              filtro === p.id
                ? "rounded-full bg-azul px-5 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-azul px-5 py-2 text-sm font-semibold text-azul hover:bg-azul hover:text-white"
            }
          >
            {p.texto}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((t) => (
          <li
            key={t.id}
            className="flex flex-col gap-3 rounded-2xl border border-oscuro/10 bg-white p-6 shadow-sm"
          >
            <span className="w-fit rounded-full bg-turquesa/20 px-3 py-1 text-xs font-bold uppercase text-oscuro">
              {tipos[t.tipo]}
            </span>
            <h3 className="text-lg font-bold text-oscuro">{t.titulo}</h3>
            {t.linea && <p className="text-sm text-texto/80">{t.linea}</p>}

            {t.etiquetas.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {t.etiquetas.map((e) => (
                  <li
                    key={e}
                    className="rounded-full bg-turquesa/15 px-3 py-1 text-xs font-medium text-oscuro"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto pt-2">
              {t.tipo === "test" ? (
                <AbrirTestButton variante="contorno" className="w-full">
                  {t.boton}
                </AbrirTestButton>
              ) : t.descarga ? (
                <a
                  href={t.descarga}
                  download
                  className={estilosBoton("contorno", "w-full")}
                >
                  {t.boton}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className={estilosBoton("contorno", "w-full cursor-not-allowed opacity-60")}
                >
                  {t.boton}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {hayPendientes && (
        <p className="mt-4 text-center text-sm">
          <Relleno texto={pendiente} />
        </p>
      )}
    </div>
  );
}
