import { site } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import { estilosBoton } from "./Button";
import Relleno from "./Relleno";

// Recuadro de /agenda: "¿Todavía tienes dudas?". Los botones se activan al
// conectar Calendly (escucha gratuita) y el número real de WhatsApp.
export default function RecuadroAgenda({
  t,
  wa,
}: {
  t: Dictionary["agenda"]["lateral"];
  wa: string | undefined;
}) {
  const escucha = site.links.calendlyEscucha;
  const escuchaLista = escucha.startsWith("http");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-editorial text-xl font-bold">{t.titulo}</h2>
      <p className="text-sm opacity-95">{t.texto}</p>

      {escuchaLista ? (
        <a
          href={escucha}
          target="_blank"
          rel="noopener noreferrer"
          className={estilosBoton("acento")}
        >
          {t.escucha}
        </a>
      ) : (
        <>
          <span
            aria-disabled="true"
            className={estilosBoton("acento", "cursor-not-allowed opacity-70")}
          >
            {t.escucha}
          </span>
          <p className="text-xs">
            <Relleno texto={escucha} />
          </p>
        </>
      )}

      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={estilosBoton("contornoClaro")}
        >
          {t.whatsapp}
        </a>
      ) : (
        <>
          <span
            aria-disabled="true"
            className={estilosBoton("contornoClaro", "cursor-not-allowed opacity-70")}
          >
            {t.whatsapp}
          </span>
          <p className="text-xs">
            <Relleno texto={site.whatsapp} />
          </p>
        </>
      )}
    </div>
  );
}
