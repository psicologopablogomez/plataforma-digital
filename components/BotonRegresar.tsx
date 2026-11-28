"use client";

import { useRouter } from "next/navigation";

// Botón flotante (abajo a la izquierda) para volver a donde estaba la persona.
//  1. Si hay una página anterior del sitio, vuelve a ella.
//  2. Si la página se abrió en una pestaña nueva (como desde Agendar), cierra la pestaña
//     y la persona queda otra vez en su formulario, sin perder lo que escribió.
//  3. Si entró directo (por ejemplo desde un enlace recibido), va al inicio.
export default function BotonRegresar({ texto, hrefInicio }: { texto: string; hrefInicio: string }) {
  const router = useRouter();

  function regresar() {
    const navegacion = (window as unknown as { navigation?: { canGoBack: boolean } }).navigation;
    const hayAnterior = navegacion ? navegacion.canGoBack : window.history.length > 1;
    if (hayAnterior) {
      router.back();
      return;
    }
    window.close();
    // Si el navegador no permite cerrar la pestaña, se va al inicio.
    setTimeout(() => router.push(hrefInicio), 200);
  }

  return (
    <button
      type="button"
      onClick={regresar}
      className="fixed bottom-4 left-4 z-40 flex h-12 items-center gap-2 rounded-full bg-azul px-5 font-semibold text-white shadow-lg hover:bg-oscuro"
    >
      <span aria-hidden="true">←</span>
      {texto}
    </button>
  );
}
