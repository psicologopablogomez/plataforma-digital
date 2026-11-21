"use client";

import { useState } from "react";
import { formato } from "@/lib/formato";
import Relleno from "./Relleno";

type Region = "CO" | "AU" | "LATAM";
type Valor = number | string;
type Precios = Record<
  Region,
  { currency: string; first: Valor; member4: Valor; member8: Valor }
>;

type Textos = {
  region: string;
  regiones: Record<Region, string>;
  filas: { primera: string; member4: string; member8: string };
  nota: string;
};

function Celda({ valor, moneda, lang }: { valor: Valor; moneda: string; lang: string }) {
  if (typeof valor === "number") return <>{`${moneda} ${formato(valor, lang)}`}</>;
  return <Relleno texto={valor} />;
}

// Tarifas por región. Los valores salen de config/site.ts; no hay descuentos a la vista.
export default function Tarifas({
  lang,
  precios,
  t,
  inicial,
}: {
  lang: string;
  precios: Precios;
  t: Textos;
  inicial: Region;
}) {
  const [region, setRegion] = useState<Region>(inicial);
  const p = precios[region];
  const filas: { id: keyof Textos["filas"]; valor: Valor }[] = [
    { id: "primera", valor: p.first },
    { id: "member4", valor: p.member4 },
    { id: "member8", valor: p.member8 },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-3 text-center text-sm font-semibold text-oscuro">{t.region}</p>
      <div
        className="mb-6 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label={t.region}
      >
        {(Object.keys(precios) as Region[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
            className={
              region === r
                ? "rounded-full bg-azul px-5 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-azul px-5 py-2 text-sm font-semibold text-azul hover:bg-azul/10"
            }
          >
            {t.regiones[r]}
          </button>
        ))}
      </div>

      <dl className="divide-y divide-oscuro/10 overflow-hidden rounded-2xl border border-oscuro/10 bg-white shadow-sm">
        {filas.map((fila) => (
          <div
            key={fila.id}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="font-medium text-texto">{t.filas[fila.id]}</dt>
            <dd className="text-lg font-bold text-oscuro">
              <Celda valor={fila.valor} moneda={p.currency} lang={lang} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-center text-sm text-texto/70">{t.nota}</p>
    </div>
  );
}
