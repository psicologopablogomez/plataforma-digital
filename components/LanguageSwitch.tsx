"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

// Cambia ES/EN manteniendo la misma página.
export default function LanguageSwitch({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const resto = pathname.replace(/^\/(es|en)/, "");

  return (
    <div
      className="flex items-center gap-1 text-sm font-semibold"
      role="group"
      aria-label={label}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${resto}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={
            l === lang
              ? "rounded-full bg-azul px-2.5 py-1 text-white"
              : "rounded-full px-2.5 py-1 text-azul hover:bg-azul/10"
          }
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
