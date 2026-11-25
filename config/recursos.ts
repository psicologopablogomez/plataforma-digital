// Etiquetas cortas de los recursos (sus nombres están en "etiquetas" de content).
export type EtiquetaId = "ansiedad" | "dependencia" | "pareja" | "familia" | "migracion";

// Recursos gratuitos (tests y guías). Los textos están en content/es.json y en.json
// (clave "recursos.items"). Para sumar una guía: se agrega aquí y se escribe su texto allá.
//
// Las guías descargables van en /public/docs/. Cuando el PDF está subido con el nombre
// indicado en "archivo", el botón "Descargar" se activa solo.

export type Recurso = {
  id: "orientacion" | "primera-sesion" | "trampas" | "decir-no";
  tipo: "test" | "guia";
  etiquetas: EtiquetaId[];
  archivo?: string;
};

export const recursos: Recurso[] = [
  {
    id: "orientacion",
    tipo: "test",
    // Las 4 áreas del test de orientación
    etiquetas: ["ansiedad", "pareja", "familia", "migracion"],
  },
  {
    id: "primera-sesion",
    tipo: "guia",
    etiquetas: [],
    archivo: "/docs/guia-primera-sesion.pdf",
  },
  {
    id: "trampas",
    tipo: "guia",
    etiquetas: ["ansiedad"],
    archivo: "/docs/guia-trampas-de-la-mente.pdf",
  },
  {
    id: "decir-no",
    tipo: "guia",
    etiquetas: ["dependencia"],
    archivo: "/docs/guia-decir-no.pdf",
  },
];
