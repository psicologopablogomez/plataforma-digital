import { isPlaceholder } from "@/lib/i18n";

// Un enlace real solo si el dato ya está definido; si no, se muestra el relleno.
export default function EnlaceExterno({
  nombre,
  url,
  claro = true,
}: {
  nombre: string;
  url: string;
  claro?: boolean;
}) {
  if (isPlaceholder(url)) {
    return (
      <span className={claro ? "opacity-80" : "text-texto/70"}>
        {nombre} <span className="font-mono text-xs text-naranja">{url}</span>
      </span>
    );
  }
  return (
    <a href={url} className="hover:underline" rel="noopener noreferrer" target="_blank">
      {nombre}
    </a>
  );
}
