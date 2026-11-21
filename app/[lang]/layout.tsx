import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/config/site";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  return { title: site.name, description: getDictionary(lang).marca.promesa };
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
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang} t={t} />
        <div className="flex-1">{children}</div>
        <Footer lang={lang} t={t} />
        <WhatsAppButton t={t.whatsapp} />
      </body>
    </html>
  );
}
