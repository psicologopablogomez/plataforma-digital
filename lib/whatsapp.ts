import { site } from "@/config/site";

// Enlace de WhatsApp con mensaje prellenado. Mientras el número siga como
// [[POR DEFINIR]], devuelve undefined y los botones se ven apagados.
export function whatsappHref(mensaje: string): string | undefined {
  const numero = site.whatsapp.replace(/\D/g, "");
  if (numero.length < 8) return undefined;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

// Cómo se muestra el número en pantalla: +61 404 712 121.
export function telefonoVisible(numero: string): string {
  const australia = numero.match(/^\+61(\d{3})(\d{3})(\d{3})$/);
  return australia ? `+61 ${australia[1]} ${australia[2]} ${australia[3]}` : numero;
}
