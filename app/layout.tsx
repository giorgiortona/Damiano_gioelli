import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Damiano Oro e Gioielli | Atelier orafo a Galatone",
  description:
    "Atelier orafo e gioielleria a Galatone. Creazioni in oro, orologi di pregio e pezzi unici realizzati a mano.",
  icons: {
    icon: "/images/logo_damiano.jpeg",
    shortcut: "/images/logo_damiano.jpeg",
  },
  openGraph: {
    title: "Damiano Oro e Gioielli",
    description: "Il tempo diventa prezioso. Atelier orafo e gioielleria a Galatone.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
