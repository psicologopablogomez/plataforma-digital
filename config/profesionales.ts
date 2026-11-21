// Lista de profesionales. Hoy solo Juan Pablo; para sumar a alguien se agrega otro
// elemento aquí y sus textos en content/es.json y content/en.json (clave "profesionales").
// Las etiquetas son las del buscador de la Fase 2: sus nombres están en "etiquetas".

export type EtiquetaId =
  | "ansiedad"
  | "depresion"
  | "panico"
  | "fobias"
  | "duelo"
  | "dependencia"
  | "ira"
  | "sentido"
  | "vocacional"
  | "pareja"
  | "familia"
  | "migracion";

export type Profesional = {
  id: "juan-pablo";
  // Cuando la foto está subida a esta ruta, aparece sola. Si no, se ven las iniciales.
  foto: string;
  etiquetas: EtiquetaId[];
};

export const profesionales: Profesional[] = [
  {
    id: "juan-pablo",
    foto: "/images/nosotros/juan-pablo.jpg",
    etiquetas: [
      "ansiedad",
      "depresion",
      "panico",
      "fobias",
      "duelo",
      "dependencia",
      "ira",
      "sentido",
      "vocacional",
    ],
  },
];
