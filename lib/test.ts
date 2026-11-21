import testJson from "@/content/test.json";
import type { Locale } from "@/lib/i18n";

export type Area = "A" | "B" | "C" | "D";
export type ServicioId = "individual" | "pareja" | "familiar" | "migrantes";

export type Opcion = {
  texto: string;
  area?: Area;
  servicio?: ServicioId;
  alerta?: boolean;
};

export type TestData = {
  ui: {
    pregunta: string;
    de: string;
    atras: string;
    cerrar: string;
    servicioSugerido: string;
  };
  entrada: { texto: string; empezar: string; ahoraNo: string };
  preguntas: { id: string; texto: string; opciones: Opcion[] }[];
  resultados: Record<Area, { titulo: string; texto: string }>;
  avisoAlerta: string;
  botones: { primeraCita: string; escucha: string; recursos: string };
  aviso: string;
};

const datos = testJson as unknown as Record<Locale, TestData>;

export function getTest(lang: Locale): TestData {
  return datos[lang];
}
