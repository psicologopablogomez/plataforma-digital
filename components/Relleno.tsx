import { isPlaceholder } from "@/lib/i18n";

// Muestra un texto normal, o un dato pendiente ([[POR DEFINIR]]) como relleno visible.
export default function Relleno({ texto }: { texto: string }) {
  if (!isPlaceholder(texto)) return <>{texto}</>;
  return (
    <span className="rounded bg-naranja/15 px-1.5 py-0.5 font-mono text-xs text-naranja">
      {texto}
    </span>
  );
}
