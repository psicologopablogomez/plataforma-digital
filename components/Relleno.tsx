// Muestra un texto normal. Los datos pendientes ([[POR DEFINIR: ...]]) se resaltan
// como relleno visible, aunque estén en medio de una frase.
export default function Relleno({ texto }: { texto: string }) {
  const partes = texto.split(/(\[\[[^\]]*\]\])/g).filter(Boolean);
  return (
    <>
      {partes.map((parte, n) =>
        parte.startsWith("[[") ? (
          <span
            key={n}
            className="rounded bg-naranja/15 px-1.5 py-0.5 font-mono text-xs text-naranja"
          >
            {parte}
          </span>
        ) : (
          <span key={n}>{parte}</span>
        ),
      )}
    </>
  );
}
