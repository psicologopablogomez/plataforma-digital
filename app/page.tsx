import { site } from "@/config/site";
import es from "@/content/es.json";

// Página de inicio provisional (cimientos). La portada completa llega en el paso 2.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-oscuro to-azul p-6 text-center text-white">
      <p className="text-sm uppercase tracking-widest opacity-80">{site.name}</p>
      <h1 className="max-w-3xl font-editorial text-4xl font-bold sm:text-5xl">
        {es.marca.filosofia}
      </h1>
      <p className="max-w-xl text-lg opacity-90">{es.marca.promesa}</p>
    </main>
  );
}
