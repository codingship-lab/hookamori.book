import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Grape_Nuts,
  IBM_Plex_Sans,
  Marck_Script,
} from "next/font/google";
import "./globals.css";

const grapeNuts = Grape_Nuts({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const marckScript = Marck_Script({
  variable: "--font-hand",
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-reading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Личный дневник Александра",
  description: "Личная страница Александра в формате белого дневника с интерактивными вкладками.",
};

export const viewport: Viewport = {
  themeColor: "#6a4326",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${grapeNuts.variable} ${marckScript.variable} ${cormorantGaramond.variable} ${ibmPlexSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
