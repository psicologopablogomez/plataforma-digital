import Image from "next/image";
import type { Profesional } from "@/config/profesionales";
import { fotoExiste } from "@/lib/fotos";
import type { Dictionary, Locale } from "@/lib/i18n";
import Button from "./Button";
import Relleno from "./Relleno";

// Foto del profesional, o sus iniciales mientras la foto no esté subida.
export function Avatar({
  nombre,
  foto,
  tamano = 112,
}: {
  nombre: string;
  foto: string;
  tamano?: number;
}) {
  if (fotoExiste(foto)) {
    return (
      <Image
        src={foto}
        alt={nombre}
        width={tamano}
        height={tamano}
        className="rounded-full object-cover"
        style={{ width: tamano, height: tamano }}
      />
    );
  }
  const iniciales = nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-azul to-turquesa font-bold text-white"
      style={{ width: tamano, height: tamano, fontSize: tamano / 3.5 }}
      aria-hidden="true"
    >
      {iniciales}
    </div>
  );
}

// Tarjeta de profesional (esquema 7.4): foto, nombre, estudios, etiquetas y dos botones.
export default function ProfessionalCard({
  lang,
  t,
  profesional,
  frase,
  maxEtiquetas = 4,
}: {
  lang: Locale;
  t: Dictionary;
  profesional: Profesional;
  frase?: string;
  maxEtiquetas?: number;
}) {
  const datos = t.profesionales[profesional.id];
  const base = `/${lang}`;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-oscuro/10 bg-white p-8 text-center shadow-sm">
      <Avatar nombre={datos.nombre} foto={profesional.foto} />
      <div>
        <h3 className="text-xl font-bold text-oscuro">{datos.nombre}</h3>
        <p className="mt-1 text-sm font-medium text-azul">{datos.cargo}</p>
        <p className="mt-1 text-sm text-texto/70">
          <Relleno texto={datos.estudios} />
        </p>
      </div>

      {frase && <p className="font-editorial text-xl text-oscuro">“{frase}”</p>}

      <ul className="flex flex-wrap justify-center gap-2">
        {profesional.etiquetas.slice(0, maxEtiquetas).map((id) => (
          <li
            key={id}
            className="rounded-full bg-turquesa/15 px-3 py-1 text-xs font-medium text-oscuro"
          >
            {t.etiquetas[id]}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={`${base}/nosotros/${profesional.id}`} variante="contorno">
          {t.tarjeta.perfil}
        </Button>
        <Button href={`${base}/agenda`}>{t.tarjeta.agendar}</Button>
      </div>
    </div>
  );
}
