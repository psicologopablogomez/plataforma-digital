// Ayuda en crisis por país. Solo se escriben números VERIFICADOS en fuentes oficiales.
// Para cualquier otro país, el botón lleva a un directorio internacional de líneas de ayuda.
// Para agregar los números de otro país: se suma una entrada en "ayudaCrisis".

export type LineaCrisis = {
  nombre: string;
  telefono: string; // como se muestra: "13 11 14"
  tel: string; // solo dígitos, para el enlace de llamada
  descripcion: { es: string; en: string };
};

export type AyudaPais = {
  emergencias: string; // número general de emergencias del país
  lineas: LineaCrisis[];
};

export const ayudaCrisis: Record<string, AyudaPais> = {
  // Fuentes: healthdirect.gov.au, NSW Health y Better Health Channel (Victoria).
  AU: {
    emergencias: "000",
    lineas: [
      {
        nombre: "Lifeline",
        telefono: "13 11 14",
        tel: "131114",
        descripcion: {
          es: "Apoyo en crisis las 24 horas. También por mensaje de texto al 0477 13 11 14.",
          en: "24-hour crisis support. Also by text message on 0477 13 11 14.",
        },
      },
      {
        nombre: "Suicide Call Back Service",
        telefono: "1300 659 467",
        tel: "1300659467",
        descripcion: {
          es: "Orientación por teléfono y en línea para personas con pensamientos suicidas o afectadas por el suicidio.",
          en: "Phone and online counselling for people who are suicidal or affected by suicide.",
        },
      },
    ],
  },

  // Fuente: Ministerio de Salud y Protección Social (minsalud.gov.co, Línea 106).
  // El 123 es el número único de emergencias de Colombia.
  CO: {
    emergencias: "123",
    lineas: [
      {
        nombre: "Línea 106",
        telefono: "106",
        tel: "106",
        descripcion: {
          es: "Línea nacional de salud mental del Ministerio de Salud. Gratuita, confidencial y las 24 horas.",
          en: "National mental health line of the Ministry of Health. Free, confidential and open 24 hours.",
        },
      },
    ],
  },

  // Fuente: Ministerio de Sanidad de España (sanidad.gob.es/linea024).
  ES: {
    emergencias: "112",
    lineas: [
      {
        nombre: "Línea 024",
        telefono: "024",
        tel: "024",
        descripcion: {
          es: "Atención a la conducta suicida del Ministerio de Sanidad. Gratuita, confidencial, las 24 horas y todos los días.",
          en: "Suicide-prevention line of Spain's Ministry of Health. Free, confidential, 24 hours a day, every day.",
        },
      },
    ],
  },
};

// Directorio internacional con una página por país (findahelpline.com).
// Estos países NO tienen página allí; para ellos se usa el directorio de la IASP.
const SIN_PAGINA_EN_DIRECTORIO = new Set(
  (
    "AF AI AO AS AX BL BQ BZ CC CD CF CG CK CM CX EG EH ER ET FK FM GN GQ GW IO KM KN KP " +
    "LS LY MF MH ML MP MS NF NU PF PM PN PW SA SD SH SM SN SO SR SS ST SX SY TC TD TJ TK " +
    "TV UZ VA VC VG VI WF"
  ).split(" "),
);

const DIRECTORIO_IASP = "https://www.iasp.info/crisis-centres-helplines/";

// Página con líneas de ayuda del país elegido.
export function urlDirectorio(code: string): string {
  if (SIN_PAGINA_EN_DIRECTORIO.has(code)) return DIRECTORIO_IASP;
  return `https://findahelpline.com/countries/${code.toLowerCase()}`;
}
