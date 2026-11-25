import Link from "next/link";

export type Variante = "principal" | "acento" | "contorno" | "contornoClaro";

const estilos: Record<Variante, string> = {
  principal: "bg-azul text-white not-aria-disabled:hover:bg-oscuro",
  acento: "bg-naranja text-oscuro not-aria-disabled:hover:bg-turquesa",
  contorno: "border border-azul text-azul not-aria-disabled:hover:bg-azul not-aria-disabled:hover:text-white",
  contornoClaro: "border border-white text-white not-aria-disabled:hover:bg-white not-aria-disabled:hover:text-oscuro",
};

// Las clases del botón, para usarlas también en botones que no son enlaces.
export function estilosBoton(variante: Variante, className = ""): string {
  return `inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-base font-semibold ${estilos[variante]} ${className}`;
}

// Botón-enlace reutilizable. Al conectar Cal.com/Stripe solo cambia el destino.
export default function Button({
  href,
  children,
  variante = "principal",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  className?: string;
}) {
  return (
    <Link href={href} className={estilosBoton(variante, className)}>
      {children}
    </Link>
  );
}
