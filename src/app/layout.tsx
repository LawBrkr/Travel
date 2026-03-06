import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Europa & Asia Viajes — Experiencias Únicas",
  description:
    "Descubre los destinos más fascinantes de Europa y Asia. Reserva tu viaje con checkout seguro en 3 pasos. Mobile-first, precios dinámicos.",
  openGraph: {
    title: "Europa & Asia Viajes",
    description: "Experiencias únicas en Europa y Asia. Reserva fácil y segura.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts loaded via link to avoid Turbopack CSS @import restrictions */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
