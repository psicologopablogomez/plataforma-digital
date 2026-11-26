import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profesionales } from "@/config/profesionales";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Avatar } from "@/components/ProfessionalCard";
import Button from "@/components/Button";
import Relleno from "@/components/Relleno";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    profesionales.map((p) => ({ lang, profesional: p.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; profesional: string }>;
}): Promise<Metadata> {
  const { lang, profesional } = await params;
  const p = profesionales.find((x) => x.id === profesional);
  if (!isLocale(lang) || !p) return {};
  return { title: getDictionary(lang).profesionales[p.id].nombre };
}

type Fila = { titulo: string; lugar: string; anio: string };

// Lista de estudios, experiencia o cursos: título, lugar y año.
function Lista({
  titulo,
  items,
  destacar = false,
  pequena = false,
}: {
  titulo: string;
  items: Fila[];
  destacar?: boolean;
  pequena?: boolean;
}) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-bold text-oscuro">{titulo}</h2>
      <ul className="flex flex-col gap-3 border-l-2 border-turquesa/50 pl-4">
        {items.map((it) => (
          <li key={it.titulo}>
            <p className={`${destacar ? "font-bold text-oscuro" : "font-semibold text-oscuro"} ${pequena ? "text-sm" : ""}`}>
              {it.titulo}
            </p>
            <p className={`text-texto/80 ${pequena ? "text-sm" : ""}`}>
              {it.lugar} · {it.anio}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Perfil del profesional (esquema 6.2): voz en "yo".
export default async function PerfilProfesional({
  params,
}: {
  params: Promise<{ lang: string; profesional: string }>;
}) {
  const { lang, profesional: id } = await params;
  if (!isLocale(lang)) notFound();
  const profesional = profesionales.find((p) => p.id === id);
  if (!profesional) notFound();

  const t = getDictionary(lang);
  const datos = t.profesionales[profesional.id];
  const p = t.perfil;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link href={`/${lang}/nosotros`} className="text-sm font-semibold text-azul hover:text-oscuro hover:underline">
        ← {p.volver}
      </Link>

      <header className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar nombre={datos.nombre} foto={profesional.foto} tamano={144} />
        <div>
          <h1 className="font-editorial text-3xl text-oscuro sm:text-4xl">
            {datos.nombre}
          </h1>
          <p className="mt-1 font-medium text-azul">{datos.cargo}</p>
        </div>
      </header>

      <section className="mt-10 flex flex-col gap-8">
        <div>
          <h2 className="mb-2 text-lg font-bold text-oscuro">{p.sobreTitulo}</h2>
          <p className="text-lg leading-relaxed text-texto/90">{p.sobre}</p>
        </div>

        <Lista titulo={p.estudiosTitulo} items={p.estudios} destacar />
        <Lista titulo={p.experienciaTitulo} items={p.experiencia} />
        <Lista titulo={p.cursosTitulo} items={p.cursos} pequena />

        <div>
          <h2 className="mb-3 text-lg font-bold text-oscuro">{p.temasTitulo}</h2>
          <ul className="flex flex-wrap gap-2">
            {profesional.especialidades.map((id) => (
              <li key={id}>
                <Link
                  href={`/${lang}/temas/${id}`}
                  className="block rounded-full bg-turquesa/15 px-3 py-1 text-sm font-medium text-oscuro hover:bg-azul hover:text-white"
                >
                  {t.especialidades[id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-oscuro">{p.idiomasTitulo}</h2>
          <p className="text-texto/80">
            <Relleno texto={p.idiomas} />
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-oscuro">{p.registroTitulo}</h2>
          <p className="text-texto/80">
            <Relleno texto={p.registro} />
          </p>
        </div>

        <div>
          <Button href={`/${lang}/agenda`}>{p.agendar}</Button>
        </div>
      </section>
    </main>
  );
}
