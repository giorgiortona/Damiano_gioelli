import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://damiano-oro-e-gioielli.matteo1-salari.chatgpt.site"),
  title: "Damiano Oro e Gioielli | Atelier orafo a Galatone",
  description:
    "Gioielleria e atelier orafo a Galatone: lavorazioni in oro e argento, orologi, oggetti preziosi per la casa e cornici.",
  icons: {
    icon: "/images/logo-damiano.png",
    shortcut: "/images/logo-damiano.png",
  },
  openGraph: {
    title: "Damiano Oro e Gioielli",
    description: "Oro, argento, orologi, oggetti preziosi per la casa e cornici. Atelier orafo a Galatone.",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Damiano Oro e Gioielli — Atelier orafo a Galatone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damiano Oro e Gioielli",
    description: "Oro, argento, orologi, oggetti preziosi per la casa e cornici. Atelier orafo a Galatone.",
    images: ["/og.png"],
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
