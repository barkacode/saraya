import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-lato" });


export const metadata: Metadata = {
  title: {
    default: "Saraya — Restaurant Tunisien à Choisy-le-Roi",
    template: "%s | Saraya Restaurant Tunisien",
  },
  description:
    "Restaurant Saraya à Choisy-le-Roi (94600) — Cuisine tunisienne authentique, couscous, grillades, spécialités du chef. Réservation pour anniversaires, fiançailles, séminaires. Orchestre live vendredi & samedi soir.",

  keywords: [
    "restaurant tunisien Choisy-le-Roi",
    "restaurant tunisien Val-de-Marne",
    "Saraya restaurant",
    "couscous Choisy-le-Roi",
    "restaurant oriental 94600",
    "soirée orchestre restaurant",
    "séminaire anniversaire fiançailles Choisy",
    "réservation groupe restaurant tunisien",
    "cuisine tunisienne authentique",
    "lablabi ojja brik Choisy",
    "restaurant tunisien",
    "soirée musicale Choisy-le-Roi",
    "restaurant pour événements privés Choisy",
    "restaurant avec orchestre live Val-de-Marne",
  ],

  metadataBase: new URL("https://www.restaurant-saraya.fr"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.restaurant-saraya.fr/",
    siteName: "Saraya Restaurant",
    title: "Saraya — Restaurant Tunisien à Choisy-le-Roi",
    description:
      "Cuisine tunisienne authentique au cœur de Choisy-le-Roi. Couscous, grillades, spécialités maison. Orchestre live vendredi & samedi. Réservation groupes & événements.",
    images: [
      {
        url: "/Image_Avant.jpeg",
        width: 1200,
        height: 630,
        alt: "Saraya Restaurant Tunisien — Choisy-le-Roi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Restaurant Saraya",
    description:
      "Cuisine tunisienne authentique. Orchestre live vendredi & samedi. Réservation groupes & événements.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/Favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/Favicon/icon-192.png",      sizes: "192x192", type: "image/png" },
      { url: "/Favicon/icon-512.png",      sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
   verification: {
    google: "ZBIZ2d2XqH7dX0RbUvc92rJrJjM1meKKh5_Pa7mpQoE",
   },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://www.restaurant-saraya.fr/",
      "name": "Saraya",
      "alternateName": "Restaurant Saraya",
      "description":
        "Restaurant tunisien authentique à Choisy-le-Roi. Couscous, grillades, spécialités maison, lablabi, ojja. Orchestre live chaque vendredi et samedi soir au premier étage. Réservations pour événements privés : fiançailles, anniversaires, séminaires, mariages.",
      "url": "https://www.restaurant-saraya.fr",
      "telephone": "+33 1 89 34 39 95",
      "email": "saraya.restaurant.contact@gmail.com",
      "image": "https://www.restaurant-saraya.fr/og-image.jpg",
      "logo": "https://www.restaurant-saraya.fr/saraya_logo_gold_transparent.png",
      "priceRange": "€€",
      "servesCuisine": ["Tunisienne", "Nord-africaine", "Orientale", "Couscous"],
      "hasMenu": "https://www.restaurant-saraya.fr/menu",

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "40 bis Rue Émile Zola",
        "addressLocality": "Choisy-le-Roi",
        "postalCode": "94600",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR",
      },

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.76681,  
        "longitude": 2.40651,
      },

      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "00:30",
        },
      ],
      "event": [
        {
          "@type": "Event",
          "name": "Soirée Orchestre — Vendredi",
          "description":
            "Chaque vendredi soir, un chanteur et son orchestre animent le premier étage du restaurant Saraya pour une soirée festive.",
          "eventSchedule": {
            "@type": "Schedule",
            "byDay": "https://schema.org/Friday",
            "startTime": "20:00",
          },
          "location": {
            "@type": "Place",
            "name": "Restaurant Saraya — Premier étage",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "40 bis Rue Émile Zola",
              "addressLocality": "Choisy-le-Roi",
              "postalCode": "94600",
              "addressCountry": "FR",
            },
          },
          "organizer": {
            "@type": "Organization",
            "name": "Saraya Restaurant",
          },
        },
        {
          "@type": "Event",
          "name": "Soirée Orchestre — Samedi",
          "description":
            "Chaque samedi soir, ambiance musicale live au premier étage du restaurant Saraya avec chanteur et orchestre.",
          "eventSchedule": {
            "@type": "Schedule",
            "byDay": "https://schema.org/Saturday",
            "startTime": "20:00",
          },
          "location": {
            "@type": "Place",
            "name": "Restaurant Saraya — Premier étage",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "40 bis Rue Émile Zola",
              "addressLocality": "Choisy-le-Roi",
              "postalCode": "94600",
              "addressCountry": "FR",
            },
          },
          "organizer": {
            "@type": "Organization",
            "name": "Saraya Restaurant",
          },
        },
      ],

      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Salle privatisable", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Orchestre live", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Réservation groupes", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Soirée fiançailles", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Soirée anniversaire", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Séminaire", "value": true },
      ],

      "sameAs": [
        "https://www.facebook.com/profile.php?id=61588448420405",
        "https://www.instagram.com/restaurant_saraya",
        "https://maps.app.goo.gl/QtZaMqDh2jSLtTfHA",
      ],
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.restaurant-saraya.fr",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Notre Carte",
          "item": "https://www.restaurant-saraya.fr/menu",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <head>
        {/* JSON-LD injecté directement dans le <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}