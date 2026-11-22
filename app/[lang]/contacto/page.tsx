import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";
import { tituloPagina } from "@/lib/metadata";
import { whatsappHref } from "@/lib/whatsapp";
import { estilosBoton } from "@/components/Button";
import EnlaceExterno from "@/components/EnlaceExterno";
import FormularioPrueba, { type CampoFormulario } from "@/components/FormularioPrueba";
import Relleno from "@/components/Relleno";
import Seccion from "@/components/Seccion";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return tituloPagina(params, (t) => t.nav.contacto);
}

export default async function Contacto({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = t.contacto;
  const wa = whatsappHref(t.whatsapp.mensaje);

  const campos: CampoFormulario[] = [
    { id: "nombre", label: c.form.nombre, tipo: "text", requerido: true },
    { id: "correo", label: c.form.correo, tipo: "email", requerido: true },
    { id: "mensaje", label: c.form.mensaje, tipo: "textarea", requerido: true },
  ];

  return (
    <main>
      <Seccion ancho="max-w-3xl">
        <div className="text-center">
          <h1 className="font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
            {c.titulo}
          </h1>
          <p className="mt-4 text-lg text-texto/80">{c.texto}</p>

          <div className="mt-8 flex flex-col items-center gap-2">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={estilosBoton("principal", "px-10 py-4 text-lg")}
              >
                {c.whatsapp}
              </a>
            ) : (
              <>
                <span
                  aria-disabled="true"
                  className={estilosBoton(
                    "principal",
                    "cursor-not-allowed px-10 py-4 text-lg opacity-60",
                  )}
                >
                  {c.whatsapp}
                </span>
                <p className="text-xs">
                  <Relleno texto={site.whatsapp} />
                </p>
              </>
            )}
          </div>
        </div>
      </Seccion>

      <Seccion fondo="suave">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-2 text-lg font-bold text-oscuro">{c.correo}</h2>
              <p className="text-sm">
                <Relleno texto={site.email} />
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-oscuro">{c.redes}</h2>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <EnlaceExterno nombre="Instagram" url={site.links.instagram} claro={false} />
                </li>
                <li>
                  <EnlaceExterno nombre="Facebook" url={site.links.facebook} claro={false} />
                </li>
                <li>
                  <EnlaceExterno nombre="TikTok" url={site.links.tiktok} claro={false} />
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-oscuro">{c.form.titulo}</h2>
            <FormularioPrueba
              campos={campos}
              boton={c.form.boton}
              opcional={c.form.opcional}
              prueba={c.form.prueba}
              enviado={c.form.enviado}
            />
          </div>
        </div>
      </Seccion>
    </main>
  );
}
