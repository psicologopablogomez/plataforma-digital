import type { Locale } from "@/lib/i18n";

// Grupos de precio: Colombia y Australia tienen precio propio; el resto de países
// paga el precio internacional (USD).
export type Region = "CO" | "AU" | "OTROS";

// Países fijos al inicio de la lista, con precio propio.
export const PAISES_PRINCIPALES = ["CO", "AU"] as const;

// Códigos de país (ISO 3166-1) con su nombre en cada idioma. Se excluyen los
// territorios sin población permanente.
const CODIGOS = (
  "AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO " +
  "BQ BR BS BT BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ " +
  "DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN " +
  "GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG " +
  "KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK " +
  "ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM " +
  "PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI " +
  "SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA " +
  "UG US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW"
).split(" ");

export type Pais = { code: string; name: string };

// Lista para el selector: primero Colombia y Australia, después todos los demás
// países en orden alfabético. Se calcula en el servidor para que el nombre sea
// el mismo en el servidor y en el navegador.
export function listaPaises(lang: Locale): { principales: Pais[]; otros: Pais[] } {
  const nombres = new Intl.DisplayNames([lang], { type: "region" });
  const nombre = (code: string) => nombres.of(code) ?? code;

  const principales = PAISES_PRINCIPALES.map((code) => ({ code, name: nombre(code) }));
  const otros = CODIGOS.filter((c) => !(PAISES_PRINCIPALES as readonly string[]).includes(c))
    .map((code) => ({ code, name: nombre(code) }))
    .filter((p) => p.name !== p.code)
    .sort((a, b) => a.name.localeCompare(b.name, lang));

  return { principales, otros };
}

// Colombia y Australia tienen su precio; cualquier otro país paga el internacional.
export function regionDePais(code: string): Region | undefined {
  if (!code) return undefined;
  if (code === "CO") return "CO";
  if (code === "AU") return "AU";
  return "OTROS";
}
