"use client";

import { useState } from "react";
import { estilosBoton } from "./Button";

export type CampoFormulario = {
  id: string;
  label: string;
  tipo: "text" | "email" | "tel" | "textarea";
  requerido: boolean;
};

const campo =
  "w-full rounded-lg border border-oscuro/20 bg-white px-3 py-2 text-base text-texto focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/30";

// Formulario de la Fase 0: se ve y se puede completar, pero NO guarda ni envía nada.
// En la Fase 2 se conecta a Supabase.
export default function FormularioPrueba({
  campos,
  boton,
  opcional,
  prueba,
  enviado,
}: {
  campos: CampoFormulario[];
  boton: string;
  opcional: string;
  prueba: string;
  enviado: string;
}) {
  const [listo, setListo] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        setListo(true);
      }}
      onChange={() => setListo(false)}
      className="flex flex-col gap-4"
    >
      {campos.map((c) => (
        <label key={c.id} className="flex flex-col gap-1 text-sm font-semibold text-oscuro">
          <span>
            {c.label}
            {!c.requerido && (
              <span className="font-normal text-texto/70"> {opcional}</span>
            )}
          </span>
          {c.tipo === "textarea" ? (
            <textarea name={c.id} rows={4} required={c.requerido} className={campo} />
          ) : (
            <input name={c.id} type={c.tipo} required={c.requerido} className={campo} />
          )}
        </label>
      ))}

      <p className="rounded-xl bg-naranja/15 p-3 text-sm font-medium text-oscuro">{prueba}</p>

      <button type="submit" className={estilosBoton("principal", "self-start")}>
        {boton}
      </button>

      {listo && (
        <p role="status" className="rounded-xl bg-turquesa/15 p-4 text-sm font-medium text-oscuro">
          {enviado}
        </p>
      )}
    </form>
  );
}
