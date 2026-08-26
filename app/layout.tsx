import type { Metadata } from "next";
import { Bodoni_Moda, Lato, Playfair_Display } from "next/font/google";
import { SITE_URL, finalCta, heroContent } from "@/data/amabayContent";
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

const bodoniModa = Bodoni_Moda({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni-moda",
  axes: ["opsz"],
});

/**
 * URL absolue du site. Vercel expose le domaine de production dans
 * l'environnement : sans cela, les images Open Graph et le lien canonique
 * pointeraient vers l'hôte de préproduction quel que soit le déploiement.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : SITE_URL);

const title = `AMABAY PLACE — ${heroContent.title}`;
const description = heroContent.location;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title,
    description,
    locale: "fr_MA",
    type: "website",
    url: "/",
    siteName: "AMABAY PLACE",
    images: [
      {
        url: "/og.jpg",
        width: 1672,
        height: 941,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

/**
 * Données structurées : AMABAY PLACE est un centre commercial physique, ce que
 * les moteurs de recherche et les fiches locales exploitent directement.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ShoppingCenter",
  name: "AMABAY PLACE",
  description,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: finalCta.address,
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Groupe STRAPEX Maroc",
    foundingDate: "2000",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${lato.variable} ${playfairDisplay.variable} ${bodoniModa.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD sérialisé depuis des constantes locales.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
