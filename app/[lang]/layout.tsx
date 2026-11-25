import type { Metadata } from "next";
import { Figtree, Young_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/config/site";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TestModal from "@/components/TestModal";
import { getTest } from "@/lib/test";
import { listaPaises } from "@/lib/paises";

// Tipografía: Figtree para el texto y Young Serif para títulos y frases destacadas.
// Next.js las descarga al construir el sitio y las sirve desde tu propio dominio.
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    // Inicio: solo el nombre. Las demás páginas: "Página · Nombre".
    title: { default: site.name, template: `%s · ${site.name}` },
    description: getDictionary(lang).marca.promesa,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${figtree.variable} ${youngSerif.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang} t={t} paises={listaPaises(lang)} />
        <div className="flex-1">{children}</div>
        <Footer lang={lang} t={t} />
        <WhatsAppButton t={t.whatsapp} />
        <TestModal
          lang={lang}
          test={getTest(lang)}
          servicios={{
            individual: t.inicio.acompanamos.items[0].titulo,
            pareja: t.inicio.acompanamos.items[1].titulo,
            familiar: t.inicio.acompanamos.items[2].titulo,
            migrantes: t.inicio.acompanamos.items[3].titulo,
          }}
          crisisLabel={t.crisis.boton}
        />
      </body>
    </html>
  );
}
