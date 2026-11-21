import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { estilosBoton } from "@/components/Button";
import FormularioPrueba, { type CampoFormulario } from "@/components/FormularioPrueba";
import Relleno from "@/components/Relleno";
import Seccion from "@/components/Seccion";

export default async function Eventos({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const e = t.eventos;
  const ev = t.inicio.evento; // el mismo evento que se ve en el Inicio

  const campos: CampoFormulario[] = [
    { id: "nombre", label: e.form.nombre, tipo: "text", requerido: true },
    { id: "correo", label: e.form.correo, tipo: "email", requerido: true },
    { id: "pais", label: e.form.pais, tipo: "text", requerido: true },
    { id: "whatsapp", label: e.form.whatsapp, tipo: "tel", requerido: false },
  ];

  return (
    <main>
      <Seccion ancho="max-w-3xl">
        <div className="text-center">
          <h1 className="font-editorial text-3xl font-bold text-oscuro sm:text-5xl">
            {e.titulo}
          </h1>
          <p className="mt-4 text-lg text-texto/80">{e.texto}</p>
        </div>
      </Seccion>

      <Seccion fondo="suave" ancho="max-w-3xl">
        <article className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-oscuro to-azul p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
            {e.primer}
          </p>
          <h2 className="font-editorial text-2xl font-bold sm:text-3xl">{ev.nombre}</h2>
          <p className="opacity-95">{ev.texto}</p>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <span className="font-semibold">{e.formatoEtiqueta}:</span> {e.formato}
            </li>
            <li>
              <span className="font-semibold">{ev.etiquetaFecha}:</span>{" "}
              <Relleno texto={ev.fecha} />
            </li>
            <li>
              <span className="font-semibold">{ev.etiquetaCosto}:</span> {ev.costo}
            </li>
          </ul>
          <div>
            <a href="#inscripcion" className={estilosBoton("acento")}>
              {ev.boton}
            </a>
          </div>
        </article>
      </Seccion>

      <Seccion titulo={e.inscripcionTitulo} ancho="max-w-xl">
        <div id="inscripcion" className="scroll-mt-24">
          <FormularioPrueba
            campos={campos}
            boton={e.form.boton}
            opcional={e.form.opcional}
            prueba={e.form.prueba}
            enviado={e.form.enviado}
          />
        </div>
      </Seccion>
    </main>
  );
}
