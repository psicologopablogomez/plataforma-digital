import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import es from "@/content/es.json";

export const metadata: Metadata = {
  title: site.name,
  description: es.marca.promesa,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
