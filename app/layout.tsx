import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const playfairDisplay = Playfair_Display({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "AMABAY PLACE — Là où la vie prend forme",
  description:
    "Une nouvelle destination à Casablanca dédiée à la maison, au design, au lifestyle, à la restauration et aux nouvelles expériences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${lato.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
