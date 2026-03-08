import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traza Travel — Despacho Privado de Arquitectura de Viajes",
  description:
    "Especialistas en el diseño de viajes de autor a Europa y Asia con la precisión que solo la anticipación puede ofrecer.",
  openGraph: {
    title: "Traza Travel",
    description: "Diseño de viajes de autor a Europa y Asia.",
    type: "website",
  },
  icons: {
    icon: "/Icon_traza_travel.png",
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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-cream-50 text-navy-950">
        {children}
      </body>
    </html>
  );
}
