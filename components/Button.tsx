import Link from "next/link";

export type Variante = "principal" | "acento" | "contorno" | "contornoClaro";

const estilos: Record<Variante, string> = {
  principal: "bg-azul text-white hover:brightness-110",
  acento: "bg-naranja text-oscuro hover:brightness-95",
  contorno: "border border-azul text-azul hover:bg-azul/10",
  contornoClaro: "border border-white text-white hover:bg-white/10",
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
