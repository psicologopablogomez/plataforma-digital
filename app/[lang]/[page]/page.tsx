import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotonRegresar from "@/components/BotonRegresar";
import { getDictionary, isLocale, locales, pageSlugs } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => pageSlugs.map((page) => ({ lang, page })));
}

const legales = [
  "aviso-de-privacidad",
  "terminos-y-condiciones",
  "politica-de-cancelacion",
  "consentimiento-informado",
];

// Cada sección de un texto legal: párrafos, una lista y párrafos de cierre (pueden ir vacíos).
type Documento = {
  intro: string;
  secciones: { titulo: string; texto: string[]; lista: string[]; cierre: string[] }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}): Promise<Metadata> {
  const { lang, page } = await params;
  if (!isLocale(lang)) return {};
  const titulo = (getDictionary(lang).paginas as Record<string, string>)[page];
  return titulo ? { title: titulo } : {};
}

// Páginas legales: muestra el texto de content (clave "textosLegales") si ya existe.
// Las que todavía no lo tienen se ven como provisionales.
export default async function PaginaTexto({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}) {
  const { lang, page } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const titulos = t.paginas as Record<string, string>;
  const titulo = titulos[page];
  if (!titulo) notFound();

  const documentos = t.textosLegales.documentos as Record<string, Documento>;
  const doc = documentos[page];

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col gap-4 px-4 pb-28 pt-16">
      <BotonRegresar texto={t.textosLegales.regresar} hrefInicio={`/${lang}`} />
      <h1 className="font-editorial text-3xl text-oscuro sm:text-4xl">{titulo}</h1>

      {!doc ? (
        <p className="text-texto/80">
          {legales.includes(page) ? t.pendiente.textoLegal : t.pendiente.enConstruccion}
        </p>
      ) : (
        <>
          <p className="rounded-xl bg-naranja/15 p-4 text-sm font-semibold text-oscuro">
            {t.textosLegales.borrador}
          </p>
          <p className="text-sm text-texto/70">{t.textosLegales.actualizado}</p>
          <p className="text-lg leading-relaxed text-texto/90">{doc.intro}</p>

          {doc.secciones.map((s) => (
            <section key={s.titulo} className="mt-4 flex flex-col gap-3">
              <h2 className="text-lg font-bold text-oscuro">{s.titulo}</h2>
              {s.texto.map((p) => (
                <p key={p} className="leading-relaxed text-texto/90">{p}</p>
              ))}
              {s.lista.length > 0 && (
                <ul className="flex list-disc flex-col gap-2 pl-6 leading-relaxed text-texto/90 marker:text-azul">
                  {s.lista.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.cierre.map((p) => (
                <p key={p} className="leading-relaxed text-texto/90">{p}</p>
              ))}
            </section>
          ))}

          <nav className="mt-10 border-t border-oscuro/10 pt-6">
            <p className="font-bold text-oscuro">{t.textosLegales.relacionados}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {Object.keys(documentos)
                .filter((slug) => slug !== page)
                .map((slug) => (
                  <li key={slug}>
                    <Link href={`/${lang}/${slug}`} className="font-semibold text-azul hover:text-oscuro hover:underline">
                      {titulos[slug]}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </>
      )}
    </main>
  );
}
