// Lista de profesionales. Hoy solo Pablo Gómez; para sumar a alguien se agrega otro
// elemento aquí y sus textos en content/es.json y content/en.json (clave "profesionales").
// Las especialidades son las del buscador de la Fase 2: sus nombres están en "especialidades".

import type { EtiquetaId } from "./recursos";

export type EspecialidadId =
  | "ansiedad"
  | "depresion"
  | "estres"
  | "pareja"
  | "dependencia"
  | "familia"
  | "duelo"
  | "sentido"
  | "migracion";

export type Profesional = {
  id: "juan-pablo";
  // Cuando la foto está subida a esta ruta, aparece sola. Si no, se ven las iniciales.
  foto: string;
  // Todas las especialidades aparecen en la página de perfil.
  especialidades: EspecialidadId[];
  // Etiquetas cortas que se ven en la tarjeta (Inicio y Nosotros).
  etiquetasTarjeta: EtiquetaId[];
};

export const profesionales: Profesional[] = [
  {
    id: "juan-pablo",
    foto: "/images/nosotros/juan-pablo.jpg",
    especialidades: [
      "ansiedad",
      "depresion",
      "estres",
      "pareja",
      "dependencia",
      "familia",
      "duelo",
      "sentido",
      "migracion",
    ],
    etiquetasTarjeta: ["ansiedad", "pareja", "familia", "migracion", "sentido"],
  },
];
