import Image from "next/image";
import { fotoExiste } from "@/lib/fotos";

// Muestra la foto si ya fue subida a /public/images/... y, si no, un fondo de color.
// Al subir la foto a GitHub con el nombre indicado, aparece sola.
export default function Foto({
  ruta,
  alt,
  className = "h-40",
}: {
  ruta: string;
  alt: string;
  className?: string;
}) {
  if (fotoExiste(ruta)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={ruta}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`bg-gradient-to-br from-turquesa to-azul ${className}`}
      aria-hidden="true"
    />
  );
}
