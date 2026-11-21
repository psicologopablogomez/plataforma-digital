// Separador de miles fijo (igual en el servidor y en el navegador):
// 100.000 en español y 100,000 en inglés.
export function formato(valor: number, lang: string): string {
  const separador = lang === "es" ? "." : ",";
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separador);
}
