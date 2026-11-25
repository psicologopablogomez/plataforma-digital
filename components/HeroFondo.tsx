import { getImageProps } from "next/image";
import { fotoExiste } from "@/lib/fotos";

// Foto de fondo de la portada. Tiene dos versiones, para que cada pantalla descargue solo
// la que necesita:
//   /images/inicio/hero.jpg        recorte horizontal (computador y tableta)
//   /images/inicio/hero-movil.jpg  foto vertical completa (celular)
// Si no hay ninguna foto subida, no se muestra nada y la portada usa el degradado de color.
const ESCRITORIO = "/images/inicio/hero.jpg";
const MOVIL = "/images/inicio/hero-movil.jpg";

export default function HeroFondo() {
  const hayEscritorio = fotoExiste(ESCRITORIO);
  const hayMovil = fotoExiste(MOVIL);
  if (!hayEscritorio && !hayMovil) return null;

  const comun = {
    alt: "",
    fill: true,
    priority: true,
    sizes: "100vw",
    quality: 75,
    className: "object-cover",
  } as const;
  const { props: escritorio } = getImageProps({ ...comun, src: hayEscritorio ? ESCRITORIO : MOVIL });
  const { props: movil } = getImageProps({ ...comun, src: hayMovil ? MOVIL : ESCRITORIO });
  const { srcSet: srcSetEscritorio } = escritorio;

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet={srcSetEscritorio} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...movil} alt="" />
      </picture>
      {/*
        Capa de azul oscuro sobre la foto: más firme en celular (donde el sendero claro queda
        detrás del texto) y más suave en computador. Medido sobre la zona del texto, el texto
        blanco tiene en el 95 % de los puntos un contraste de 7 a 1 en computador y de 4,8 a 1
        en celular (el mínimo recomendado es 4,5 a 1).
      */}
      <div className="absolute inset-0 bg-oscuro/55 md:bg-oscuro/42" />
    </>
  );
}
