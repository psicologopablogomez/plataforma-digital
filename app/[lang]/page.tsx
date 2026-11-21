import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";

// Inicio provisional. La portada completa llega en el paso 2.
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-gradient-to-b from-oscuro to-azul p-6 text-center text-white">
      <p className="text-sm uppercase tracking-widest opacity-80">{site.name}</p>
      <h1 className="max-w-3xl font-editorial text-4xl font-bold sm:text-5xl">
        {t.marca.filosofia}
      </h1>
      <p className="max-w-xl text-lg opacity-90">{t.marca.promesa}</p>
    </main>
  );
}
