"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Pais } from "@/lib/paises";
import { estilosBoton } from "./Button";
import Relleno from "./Relleno";

type Pestana = "inicio" | "proceso" | "membresia" | "escucha" | "materiales" | "perfil";

const campo =
  "w-full rounded-lg border border-oscuro/20 bg-white px-3 py-2 text-base text-texto focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/30";
const etiqueta = "flex flex-col gap-1 text-sm font-semibold text-oscuro";

// ---- DATOS DE EJEMPLO (Fase 0). En la Fase 2 vendrán de Supabase. ----
const DIAS_SESIONES_PASADAS = [-35, -28, -21, -14, -7]; // hace 5, 4, 3, 2 y 1 semana(s)
const DIAS_PROXIMA_CITA = 2;
const SESIONES_POR_SEMANA = [1, 1, 1, 1, 1, 0]; // últimas 6 semanas
const MEMBRESIA = { total: 4, usadas: 2, diasParaRenovar: 18 };
const ESPACIOS_POR_SEMANA: number = site.tokens.perWeek;

function enlaceListo(valor: string) {
  return valor.startsWith("http");
}

function BotonEnlace({
  href,
  children,
  variante,
}: {
  href: string;
  children: React.ReactNode;
  variante: "principal" | "contorno";
}) {
  if (enlaceListo(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={estilosBoton(variante)}>
        {children}
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      className={estilosBoton(variante, "cursor-not-allowed opacity-60")}
    >
      {children}
    </span>
  );
}

// Mi espacio (esquema 8): interfaz con datos de ejemplo, sin cuenta real.
export default function MiEspacio({
  lang,
  t,
  etapas,
  paises,
  idiomas,
}: {
  lang: Locale;
  t: Dictionary["miEspacio"];
  etapas: string[];
  paises: { principales: Pais[]; otros: Pais[] };
  idiomas: { es: string; en: string };
}) {
  const [dentro, setDentro] = useState(false);
  const [correo, setCorreo] = useState("");
  const [pestana, setPestana] = useState<Pestana>("inicio");
  const [ahora, setAhora] = useState<Date | null>(null);
  const [zona, setZona] = useState("");
  const [espacios, setEspacios] = useState(ESPACIOS_POR_SEMANA);
  const [guardado, setGuardado] = useState(false);

  // Las fechas de ejemplo se calculan en el navegador, con la hora de la persona.
  useEffect(() => {
    setAhora(new Date());
    try {
      setZona(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      setZona("");
    }
  }, []);

  const diaDesdeHoy = (dias: number, hora = 10) => {
    const d = new Date(ahora ?? 0);
    d.setDate(d.getDate() + dias);
    d.setHours(hora, 0, 0, 0);
    return d;
  };
  const idioma = lang === "es" ? "es" : "en";
  const corta = (d: Date) =>
    d.toLocaleDateString(idioma, { day: "numeric", month: "short", year: "numeric" });
  const larga = (d: Date) =>
    d.toLocaleString(idioma, {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

  const pestanas = Object.keys(t.pestanas) as Pestana[];

  // ---------- Pantalla de acceso ----------
  if (!dentro) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-oscuro/10 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-oscuro">{t.acceso.titulo}</h2>
        <p className="mt-2 text-texto/80">{t.acceso.texto}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDentro(true);
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <label className={etiqueta}>
            {t.acceso.correo}
            <input
              required
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={campo}
            />
          </label>
          <p className="rounded-xl bg-naranja/15 p-3 text-sm font-medium text-oscuro">
            {t.acceso.demo}
          </p>
          <button type="submit" className={estilosBoton("principal", "self-start")}>
            {t.acceso.boton}
          </button>
        </form>
      </div>
    );
  }

  // ---------- Panel ----------
  const tomadas = DIAS_SESIONES_PASADAS.length;
  const maxSemana = Math.max(...SESIONES_POR_SEMANA, 1);
  const disponibles = MEMBRESIA.total - MEMBRESIA.usadas;

  return (
    <div className="flex flex-col gap-6">
      <p
        role="note"
        className="rounded-xl bg-naranja/15 p-3 text-center text-sm font-medium text-oscuro"
      >
        {t.banner}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-oscuro">
          {t.saludo}, {t.nombreEjemplo}
        </h2>
        <button
          type="button"
          onClick={() => {
            setDentro(false);
            setPestana("inicio");
          }}
          className="text-sm font-semibold text-azul hover:text-oscuro hover:underline"
        >
          {t.salir}
        </button>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist">
        {pestanas.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={pestana === p}
            onClick={() => setPestana(p)}
            className={
              pestana === p
                ? "rounded-full bg-azul px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-azul px-4 py-2 text-sm font-semibold text-azul hover:bg-azul hover:text-white"
            }
          >
            {t.pestanas[p]}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-oscuro/10 bg-white p-6 shadow-sm sm:p-8">
        {/* INICIO: próxima cita */}
        {pestana === "inicio" && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-oscuro">{t.inicio.proxima}</h3>
            <p className="font-editorial text-2xl text-oscuro">
              {ahora ? larga(diaDesdeHoy(DIAS_PROXIMA_CITA)) : t.inicio.calculando}
            </p>
            {zona && (
              <p className="text-sm text-texto/70">
                {t.inicio.zona}: {zona}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <BotonEnlace href={t.inicio.meet} variante="principal">
                {t.inicio.entrar}
              </BotonEnlace>
              <BotonEnlace href={site.links.agendaMiembro} variante="contorno">
                {t.inicio.reprogramar}
              </BotonEnlace>
            </div>
            <p className="text-xs">
              <Relleno texto={t.inicio.meet} /> · <Relleno texto={site.links.agendaMiembro} />
            </p>
          </div>
        )}

        {/* MI PROCESO: sesiones, etapa y gráfica sencilla */}
        {pestana === "proceso" && (
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold text-oscuro">{t.proceso.titulo}</h3>

            <div>
              <p className="mb-3 text-sm font-semibold text-oscuro">{t.proceso.etapaActual}</p>
              <ol className="grid grid-cols-3 gap-2">
                {etapas.map((e, i) => (
                  <li
                    key={e}
                    className={`rounded-xl border px-2 py-3 text-center text-sm font-semibold ${
                      i === t.proceso.etapaIndice
                        ? "border-azul bg-azul text-white"
                        : i < t.proceso.etapaIndice
                          ? "border-turquesa bg-turquesa/15 text-oscuro"
                          : "border-oscuro/15 text-texto/60"
                    }`}
                  >
                    {e}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-sm font-semibold text-oscuro">{t.proceso.tomadas}</p>
              <p className="text-4xl font-bold text-azul">{tomadas}</p>
              {ahora && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={t.proceso.fechas}>
                  {DIAS_SESIONES_PASADAS.map((dias) => (
                    <li
                      key={dias}
                      className="rounded-full bg-turquesa/15 px-3 py-1 text-xs font-medium text-oscuro"
                    >
                      {corta(diaDesdeHoy(dias))}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-oscuro">{t.proceso.grafica}</p>
              <div className="flex h-32 items-end gap-3" role="img" aria-label={t.proceso.grafica}>
                {SESIONES_POR_SEMANA.map((n, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-azul to-turquesa"
                      style={{ height: `${(n / maxSemana) * 100}%`, minHeight: n === 0 ? 4 : 0 }}
                    />
                    <span className="text-xs text-texto/70">
                      {t.proceso.semana} {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MI MEMBRESÍA */}
        {pestana === "membresia" && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-oscuro">{t.membresia.titulo}</h3>
            <p>
              <span className="text-sm font-semibold text-oscuro">{t.membresia.plan}: </span>
              {t.membresia.planValor}
            </p>
            <div>
              <p className="mb-2 text-sm font-semibold text-oscuro">
                {t.membresia.usadas}: {MEMBRESIA.usadas} {t.membresia.de} {MEMBRESIA.total}
              </p>
              <div className="h-3 w-full rounded-full bg-oscuro/10" aria-hidden="true">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-azul to-turquesa"
                  style={{ width: `${(MEMBRESIA.usadas / MEMBRESIA.total) * 100}%` }}
                />
              </div>
            </div>
            <p>
              <span className="text-sm font-semibold text-oscuro">{t.membresia.disponibles}: </span>
              {disponibles}
            </p>
            {ahora && (
              <p>
                <span className="text-sm font-semibold text-oscuro">{t.membresia.renovacion}: </span>
                {corta(diaDesdeHoy(MEMBRESIA.diasParaRenovar))}
              </p>
            )}
          </div>
        )}

        {/* ESCUCHA BREVE: contador de espacios */}
        {pestana === "escucha" && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-oscuro">{t.escucha.titulo}</h3>
            <p className="text-texto/80">{t.escucha.texto}</p>
            <p className="text-xl font-bold text-azul">
              {t.escucha.quedan
                .replace("{n}", String(espacios))
                .replace("{total}", String(ESPACIOS_POR_SEMANA))}
            </p>

            {espacios > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEspacios((n) => Math.max(0, n - 1))}
                  className={estilosBoton("principal")}
                >
                  {t.escucha.agendar}
                </button>
                <span className="text-xs">
                  <Relleno texto={site.links.agendaEscuchaMiembros} />
                </span>
              </div>
            ) : (
              <div className="rounded-xl bg-turquesa/10 p-4 text-sm">
                <p className="font-semibold text-oscuro">{t.escucha.sinEspacios}</p>
                <p className="mt-1">
                  {t.escucha.adicional} <Relleno texto={site.tokens.extraPrice} />
                </p>
              </div>
            )}

            <p className="text-xs text-texto/70">{t.escucha.demo}</p>
            {espacios !== ESPACIOS_POR_SEMANA && (
              <button
                type="button"
                onClick={() => setEspacios(ESPACIOS_POR_SEMANA)}
                className="self-start text-sm font-semibold text-azul hover:text-oscuro hover:underline"
              >
                {t.escucha.reiniciar}
              </button>
            )}
          </div>
        )}

        {/* MATERIALES */}
        {pestana === "materiales" && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-oscuro">{t.materiales.titulo}</h3>
            <p className="text-texto/80">{t.materiales.texto}</p>
            <ul className="flex flex-col gap-3">
              {t.materiales.items.map((m) => (
                <li
                  key={m.titulo}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-oscuro/10 p-4"
                >
                  <div>
                    <span className="mr-2 rounded-full bg-turquesa/20 px-3 py-1 text-xs font-bold uppercase text-oscuro">
                      {m.tipo}
                    </span>
                    <span className="font-medium text-oscuro">{m.titulo}</span>
                    <span className="ml-2 text-xs text-texto/70">({t.materiales.ejemplo})</span>
                  </div>
                  <span
                    aria-disabled="true"
                    className={estilosBoton("contorno", "cursor-not-allowed py-2 opacity-60")}
                  >
                    {t.materiales.descargar}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <Relleno texto={t.materiales.pendiente} />
            </p>
          </div>
        )}

        {/* MI PERFIL */}
        {pestana === "perfil" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setGuardado(true);
            }}
            onChange={() => setGuardado(false)}
            className="flex max-w-xl flex-col gap-4"
          >
            <h3 className="text-lg font-bold text-oscuro">{t.perfil.titulo}</h3>
            <label className={etiqueta}>
              {t.perfil.nombre}
              <input defaultValue={t.nombreEjemplo} className={campo} />
            </label>
            <label className={etiqueta}>
              {t.perfil.correo}
              <input type="email" defaultValue={correo} className={campo} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={etiqueta}>
                {t.perfil.pais}
                <select defaultValue="CO" className={campo}>
                  {[...paises.principales, ...paises.otros].map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={etiqueta}>
                {t.perfil.idioma}
                <select defaultValue={lang} className={campo}>
                  <option value="es">{idiomas.es}</option>
                  <option value="en">{idiomas.en}</option>
                </select>
              </label>
            </div>
            <label className={etiqueta}>
              {t.perfil.zona}
              <input defaultValue={zona} key={zona} className={campo} />
            </label>
            <label className={etiqueta}>
              <span>
                {t.perfil.preferencias}{" "}
                <span className="font-normal text-texto/70">{t.perfil.opcional}</span>
              </span>
              <textarea rows={3} className={campo} />
            </label>
            <p className="rounded-xl bg-naranja/15 p-3 text-sm font-medium text-oscuro">
              {t.perfil.prueba}
            </p>
            <button type="submit" className={estilosBoton("principal", "self-start")}>
              {t.perfil.guardar}
            </button>
            {guardado && (
              <p role="status" className="rounded-xl bg-turquesa/15 p-4 text-sm font-medium text-oscuro">
                {t.perfil.guardado}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
