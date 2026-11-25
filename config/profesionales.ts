// Lista de profesionales. Hoy solo Pablo Gómez; para sumar a alguien se agrega otro
// elemento aquí y sus textos en content/es.json y content/en.json (clave "profesionales").
// Las especialidades son las del buscador de la Fase 2: sus nombres están en "especialidades".

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
  // Las 4 primeras se ven en la tarjeta; todas aparecen en el perfil.
  especialidades: EspecialidadId[];
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
  },
];
