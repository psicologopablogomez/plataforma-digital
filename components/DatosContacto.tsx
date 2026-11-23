import { site } from "@/config/site";
import { isPlaceholder } from "@/lib/i18n";
import { telefonoVisible, whatsappHref } from "@/lib/whatsapp";
import Relleno from "./Relleno";

// Correo de contacto: enlace real, o relleno si todavía no está definido.
export function Correo({ className = "hover:underline" }: { className?: string }) {
  if (isPlaceholder(site.email)) return <Relleno texto={site.email} />;
  return (
    <a href={`mailto:${site.email}`} className={className}>
      {site.email}
    </a>
  );
}

// Número de WhatsApp que abre el chat con el mensaje prellenado.
export function NumeroWhatsApp({
  mensaje,
  className = "hover:underline",
}: {
  mensaje: string;
  className?: string;
}) {
  const href = whatsappHref(mensaje);
  if (!href) return <Relleno texto={site.whatsapp} />;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {telefonoVisible(site.whatsapp)}
    </a>
  );
}
