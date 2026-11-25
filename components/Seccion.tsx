// Bloque de página con título centrado (en la letra editorial) y fondo crema o suave.
export default function Seccion({
  titulo,
  children,
  fondo = "blanco",
  ancho = "max-w-6xl",
}: {
  titulo?: string;
  children: React.ReactNode;
  fondo?: "blanco" | "suave";
  ancho?: string;
}) {
  return (
    <section className={fondo === "suave" ? "bg-turquesa/10" : "bg-fondo"}>
      <div className={`mx-auto ${ancho} px-4 py-14 sm:py-20`}>
        {titulo && (
          <h2 className="mb-8 text-center font-editorial text-2xl text-oscuro sm:text-3xl">
            {titulo}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
