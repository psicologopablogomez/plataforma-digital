import { existsSync } from "node:fs";
import { join } from "node:path";

// Dice si una imagen de /public ya fue subida (por ejemplo "/images/nosotros/juan-pablo.jpg").
// Se comprueba al construir el sitio: al subir la foto a GitHub, aparece sola.
export function fotoExiste(ruta: string): boolean {
  return existsSync(join(process.cwd(), "public", ruta));
}
