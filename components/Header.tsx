"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Pais } from "@/lib/paises";
import CrisisButton from "./CrisisButton";
import LanguageSwitch from "./LanguageSwitch";

// Encabezado de todas las páginas: nombre, menú, idioma, crisis, agenda y Mi espacio.
export default function Header({
  lang,
  t,
  paises,
}: {
  lang: Locale;
  t: Dictionary;
  paises: { principales: Pais[]; otros: Pais[] };
}) {
  const [abierto, setAbierto] = useState(false);

  const menu = [
    { href: `/${lang}`, texto: t.nav.inicio },
    { href: `/${lang}/nosotros`, texto: t.nav.nosotros },
    { href: `/${lang}/servicios`, texto: t.nav.servicios },
    { href: `/${lang}/recursos`, texto: t.nav.recursos },
    { href: `/${lang}/eventos`, texto: t.nav.eventos },
    { href: `/${lang}/preguntas-frecuentes`, texto: t.nav.preguntas },
    { href: `/${lang}/contacto`, texto: t.nav.contacto },
  ];

  const cerrar = () => setAbierto(false);

  return (
    <header className="sticky top-0 z-40 border-b border-oscuro/10 bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href={`/${lang}`}
          aria-label={t.encabezado.irInicio}
          className="text-lg font-bold tracking-tight text-oscuro hover:text-azul"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium xl:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-texto hover:text-azul hover:underline hover:decoration-turquesa hover:decoration-2 hover:underline-offset-8"
            >
              {item.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CrisisButton lang={lang} t={t.crisis} paises={paises} />
          <div className="hidden xl:block">
            <LanguageSwitch lang={lang} label={t.encabezado.idioma} />
          </div>
          <Link
            href={`/${lang}/mi-espacio`}
            className="hidden whitespace-nowrap rounded-full border border-azul px-3 py-2 text-sm font-semibold text-azul hover:bg-azul hover:text-white xl:block"
          >
            {t.encabezado.miEspacio}
          </Link>
          <Link
            href={`/${lang}/agenda`}
            className="hidden whitespace-nowrap rounded-full bg-azul px-3 py-2 text-sm font-semibold text-white hover:bg-oscuro xl:block"
          >
            {t.encabezado.agenda}
          </Link>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? t.encabezado.cerrarMenu : t.encabezado.abrirMenu}
            className="rounded-lg p-2 text-oscuro hover:bg-azul hover:text-white xl:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {abierto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          className="flex flex-col gap-1 border-t border-oscuro/10 bg-white px-4 py-3 xl:hidden"
        >
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={cerrar}
              className="rounded-lg px-3 py-2 font-medium text-texto hover:bg-azul hover:text-white"
            >
              {item.texto}
            </Link>
          ))}
          <Link
            href={`/${lang}/mi-espacio`}
            onClick={cerrar}
            className="rounded-lg px-3 py-2 font-medium text-azul hover:bg-azul hover:text-white"
          >
            {t.encabezado.miEspacio}
          </Link>
          <Link
            href={`/${lang}/agenda`}
            onClick={cerrar}
            className="mt-1 rounded-full bg-azul px-4 py-3 text-center font-semibold text-white"
          >
            {t.encabezado.agenda}
          </Link>
          <div className="mt-2 px-3">
            <LanguageSwitch lang={lang} label={t.encabezado.idioma} />
          </div>
        </nav>
      )}
    </header>
  );
}
