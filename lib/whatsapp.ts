import { site } from "@/config/site";

// Enlace de WhatsApp con mensaje prellenado. Mientras el número siga como
// [[POR DEFINIR]], devuelve undefined y los botones se ven apagados.
export function whatsappHref(mensaje: string): string | undefined {
  const numero = site.whatsapp.replace(/\D/g, "");
  if (numero.length < 8) return undefined;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
