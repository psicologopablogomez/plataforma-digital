"use client";

import { EVENTO_ABRIR_TEST } from "@/lib/eventos";

// Enlace de texto que abre la ventana del test de orientación (sin cambiar de página).
export default function AbrirTestEnlace({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_TEST))}
      className={className}
    >
      {children}
    </button>
  );
}
