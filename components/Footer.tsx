import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Correo, NumeroWhatsApp } from "./DatosContacto";
import Enlace from "./EnlaceExterno";

export default function Footer({
  lang,
  t,
}: {
  lang: Locale;
  t: Dictionary;
}) {
  const menu = [
    { href: `/${lang}`, texto: t.nav.inicio },
    { href: `/${lang}/nosotros`, texto: t.nav.nosotros },
    { href: `/${lang}/servicios`, texto: t.nav.servicios },
    { href: `/${lang}/recursos`, texto: t.nav.recursos },
    { href: `/${lang}/eventos`, texto: t.nav.eventos },
    { href: `/${lang}/preguntas-frecuentes`, texto: t.nav.preguntas },
    { href: `/${lang}/contacto`, texto: t.nav.contacto },
  ];

  const legales = [
    { href: `/${lang}/aviso-de-privacidad`, texto: t.legales.privacidad },
    { href: `/${lang}/terminos-y-condiciones`, texto: t.legales.terminos },
    { href: `/${lang}/politica-de-cancelacion`, texto: t.legales.cancelacion },
    { href: `/${lang}/consentimiento-informado`, texto: t.legales.consentimiento },
  ];

  return (
    <footer className="bg-oscuro text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm opacity-90">{t.marca.lema}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-70">
            {t.pie.menu}
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-70">
            {t.pie.redes}
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Enlace nombre="Instagram" url={site.links.instagram} />
            </li>
            <li>
              <Enlace nombre="Facebook" url={site.links.facebook} />
            </li>
            <li>
              <Enlace nombre="TikTok" url={site.links.tiktok} />
            </li>
          </ul>

          <p className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide opacity-70">
            {t.pie.contacto}
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              {t.pie.correo}: <Correo />
            </li>
            <li>
              {t.pie.whatsapp}: <NumeroWhatsApp mensaje={t.whatsapp.mensaje} />
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-70">
            {t.pie.legal}
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {legales.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-4 text-center text-xs opacity-80">
        {t.pie.aviso}
      </div>
    </footer>
  );
}
