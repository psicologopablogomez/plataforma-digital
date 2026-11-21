"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { formato } from "@/lib/formato";
import { isPlaceholder, type Dictionary, type Locale } from "@/lib/i18n";
import { estilosBoton } from "./Button";
import Relleno from "./Relleno";

type Region = "CO" | "AU" | "LATAM";
type ParaQuien = "yo" | "pareja" | "familia" | "hijo";

type Datos = {
  nombre: string;
  correo: string;
  whatsapp: string;
  region: Region | "";
  idioma: Locale;
  paraQuien: ParaQuien | "";
  queTrae: string;
  menor: boolean;
  tutorNombre: string;
  tutorCorreo: string;
  tutorAutoriza: boolean;
  privacidad: boolean;
  consentimiento: boolean;
  cancelacion: boolean;
};

const campo =
  "w-full rounded-lg border border-oscuro/20 bg-white px-3 py-2 text-base text-texto focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/30";
const etiqueta = "flex flex-col gap-1 text-sm font-semibold text-oscuro";

function esEnlace(valor: string) {
  return valor.startsWith("http");
}

// Agenda tu primera cita (esquema 6.8): 1 datos · 2 pago · 3 horario.
// Fase 0: los pasos se ven y se navegan, pero NO se guarda ningún dato ni se cobra.
export default function AgendaFlow({
  lang,
  t,
  regiones,
}: {
  lang: Locale;
  t: Dictionary["agenda"];
  regiones: Record<Region, string>;
}) {
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [zona, setZona] = useState("");
  const [d, setD] = useState<Datos>({
    nombre: "",
    correo: "",
    whatsapp: "",
    region: "",
    idioma: lang,
    paraQuien: "",
    queTrae: "",
    menor: false,
    tutorNombre: "",
    tutorCorreo: "",
    tutorAutoriza: false,
    privacidad: false,
    consentimiento: false,
    cancelacion: false,
  });
  const inicioRef = useRef<HTMLDivElement>(null);

  // La zona horaria se detecta en el navegador de la persona.
  useEffect(() => {
    try {
      setZona(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      setZona("");
    }
  }, []);

  const irAPaso = (n: 1 | 2 | 3) => {
    setPaso(n);
    inicioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const set = <K extends keyof Datos>(clave: K, valor: Datos[K]) =>
    setD((previo) => ({ ...previo, [clave]: valor }));

  const mostrarTutor = d.menor || d.paraQuien === "hijo";
  const base = `/${lang}`;
  const region = d.region || undefined;
  const precios = region ? site.prices[region] : undefined;
  // Puede ser un número o un texto pendiente ([[POR DEFINIR]]).
  const primera: number | string | undefined = precios?.first;
  const enlacePago = region ? site.links.stripePrimera[region] : undefined;

  const opcionesParaQuien = Object.keys(t.form.opcionesParaQuien) as ParaQuien[];

  return (
    <div ref={inicioRef} className="scroll-mt-24">
      {/* Indicador de pasos */}
      <ol className="mb-3 grid grid-cols-3 gap-2">
        {t.pasos.map((nombre, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const actual = paso === n;
          const hecho = paso > n;
          return (
            <li key={nombre}>
              <button
                type="button"
                disabled={n > paso}
                onClick={() => irAPaso(n)}
                aria-current={actual ? "step" : undefined}
                className={`flex w-full flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center text-xs font-semibold sm:text-sm ${
                  actual
                    ? "border-azul bg-azul text-white"
                    : hecho
                      ? "border-turquesa bg-turquesa/15 text-oscuro"
                      : "border-oscuro/15 text-texto/60"
                }`}
              >
                <span>
                  {t.paso} {n}
                </span>
                <span className="font-normal">{nombre}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mb-6 text-center text-xs">
        <Relleno texto={t.validar} />
      </p>

      <p
        role="note"
        className="mb-6 rounded-xl bg-naranja/15 p-3 text-center text-sm font-medium text-oscuro"
      >
        {t.prueba}
      </p>

      {/* PASO 1 · Tus datos */}
      {paso === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            irAPaso(2);
          }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-xl font-bold text-oscuro">
            {t.paso} 1 · {t.pasos[0]}
          </h2>

          <label className={etiqueta}>
            {t.form.nombre}
            <input
              required
              autoComplete="name"
              value={d.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              className={campo}
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={etiqueta}>
              {t.form.correo}
              <input
                required
                type="email"
                autoComplete="email"
                value={d.correo}
                onChange={(e) => set("correo", e.target.value)}
                className={campo}
              />
            </label>
            <label className={etiqueta}>
              {t.form.whatsapp}
              <input
                required
                type="tel"
                autoComplete="tel"
                value={d.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className={campo}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={etiqueta}>
              {t.form.pais}
              <select
                required
                value={d.region}
                onChange={(e) => set("region", e.target.value as Region | "")}
                className={campo}
              >
                <option value="">{t.form.elige}</option>
                {(Object.keys(regiones) as Region[]).map((r) => (
                  <option key={r} value={r}>
                    {regiones[r]}
                  </option>
                ))}
              </select>
              <span className="text-xs font-normal text-texto/70">{t.form.paisAyuda}</span>
            </label>
            <label className={etiqueta}>
              {t.form.idioma}
              <select
                value={d.idioma}
                onChange={(e) => set("idioma", e.target.value as Locale)}
                className={campo}
              >
                <option value="es">{t.form.idiomas.es}</option>
                <option value="en">{t.form.idiomas.en}</option>
              </select>
            </label>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm font-semibold text-oscuro">
              {t.form.paraQuien}
            </legend>
            {opcionesParaQuien.map((o) => (
              <label
                key={o}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-oscuro/15 px-3 py-2 hover:border-azul"
              >
                <input
                  required
                  type="radio"
                  name="paraQuien"
                  value={o}
                  checked={d.paraQuien === o}
                  onChange={() => set("paraQuien", o)}
                  className="h-4 w-4 accent-azul"
                />
                {t.form.opcionesParaQuien[o]}
              </label>
            ))}
          </fieldset>

          <label className={etiqueta}>
            <span>
              {t.form.queTrae}{" "}
              <span className="font-normal text-texto/70">{t.form.opcional}</span>
            </span>
            <textarea
              rows={3}
              value={d.queTrae}
              onChange={(e) => set("queTrae", e.target.value)}
              className={campo}
            />
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={d.menor}
              onChange={(e) => set("menor", e.target.checked)}
              className="mt-1 h-4 w-4 accent-azul"
            />
            {t.form.menor}
          </label>

          {mostrarTutor && (
            <fieldset className="flex flex-col gap-4 rounded-xl border border-turquesa bg-turquesa/10 p-4">
              <legend className="px-2 text-sm font-bold text-oscuro">
                {t.form.tutorTitulo}
              </legend>
              <label className={etiqueta}>
                {t.form.tutorNombre}
                <input
                  required
                  value={d.tutorNombre}
                  onChange={(e) => set("tutorNombre", e.target.value)}
                  className={campo}
                />
              </label>
              <label className={etiqueta}>
                {t.form.tutorCorreo}
                <input
                  required
                  type="email"
                  value={d.tutorCorreo}
                  onChange={(e) => set("tutorCorreo", e.target.value)}
                  className={campo}
                />
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  required
                  type="checkbox"
                  checked={d.tutorAutoriza}
                  onChange={(e) => set("tutorAutoriza", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-azul"
                />
                {t.form.tutorAutoriza}
              </label>
            </fieldset>
          )}

          <div className="flex flex-col gap-3 rounded-xl border border-oscuro/15 p-4 text-sm">
            {(
              [
                ["privacidad", "aviso-de-privacidad", t.form.privacidad],
                ["consentimiento", "consentimiento-informado", t.form.consentimiento],
                ["cancelacion", "politica-de-cancelacion", t.form.cancelacion],
              ] as const
            ).map(([clave, ruta, texto]) => (
              <label key={clave} className="flex items-start gap-3">
                <input
                  required
                  type="checkbox"
                  checked={d[clave]}
                  onChange={(e) => set(clave, e.target.checked)}
                  className="mt-1 h-4 w-4 accent-azul"
                />
                <span>
                  {t.form.acepto}{" "}
                  <a
                    href={`${base}/${ruta}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-azul underline"
                  >
                    {texto}
                  </a>
                </span>
              </label>
            ))}
          </div>

          <button type="submit" className={estilosBoton("principal", "self-start")}>
            {t.form.continuar}
          </button>
        </form>
      )}

      {/* PASO 2 · Paga tu primera cita */}
      {paso === 2 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-oscuro">
            {t.paso} 2 · {t.pasos[1]}
          </h2>

          <div className="rounded-2xl border border-oscuro/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-oscuro">{t.pago.precio}</p>
            <p className="mt-1 text-3xl font-bold text-oscuro">
              {precios && primera !== undefined ? (
                typeof primera === "number" ? (
                  `${precios.currency} ${formato(primera, lang)}`
                ) : (
                  <Relleno texto={primera} />
                )
              ) : null}
            </p>
            {region && <p className="mt-1 text-sm text-texto/70">{regiones[region]}</p>}

            <div className="mt-5">
              {enlacePago && esEnlace(enlacePago) ? (
                <a
                  href={enlacePago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={estilosBoton("acento")}
                >
                  {t.pago.boton}
                </a>
              ) : (
                <>
                  <span
                    aria-disabled="true"
                    className={estilosBoton("acento", "cursor-not-allowed opacity-60")}
                  >
                    {t.pago.boton}
                  </span>
                  {enlacePago && isPlaceholder(enlacePago) && (
                    <p className="mt-2 text-xs">
                      <Relleno texto={enlacePago} />
                    </p>
                  )}
                </>
              )}
            </div>
            <p className="mt-4 text-sm text-texto/70">{t.pago.nota}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => irAPaso(1)}
              className={estilosBoton("contorno")}
            >
              {t.atras}
            </button>
            <button
              type="button"
              onClick={() => irAPaso(3)}
              className={estilosBoton("principal")}
            >
              {t.pago.continuar}
            </button>
          </div>
        </div>
      )}

      {/* PASO 3 · Elige tu horario */}
      {paso === 3 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-oscuro">
            {t.paso} 3 · {t.pasos[2]}
          </h2>
          <p className="text-texto/80">{t.horario.texto}</p>
          {zona && (
            <p className="text-sm">
              <span className="font-semibold text-oscuro">{t.horario.zona}:</span> {zona}
            </p>
          )}

          {esEnlace(site.links.calendlyPrimera) ? (
            <iframe
              src={site.links.calendlyPrimera}
              title={t.pasos[2]}
              className="h-[40rem] w-full rounded-2xl border border-oscuro/10"
            />
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-azul/40 bg-azul/5 p-6 text-center">
              <p className="font-semibold text-oscuro">{t.horario.calendario}</p>
              <p className="text-xs">
                <Relleno texto={site.links.calendlyPrimera} />
              </p>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => irAPaso(2)}
              className={estilosBoton("contorno")}
            >
              {t.atras}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
