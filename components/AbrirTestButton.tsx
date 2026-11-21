"use client";

import { EVENTO_ABRIR_TEST } from "@/lib/eventos";
import { estilosBoton, type Variante } from "./Button";

// Botón que abre la ventana del test de orientación desde cualquier página.
export default function AbrirTestButton({
  children,
  variante = "contorno",
  className = "",
}: {
  children: React.ReactNode;
  variante?: Variante;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_TEST))}
      className={estilosBoton(variante, className)}
    >
      {children}
    </button>
  );
}
