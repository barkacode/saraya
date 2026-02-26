import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Saraya - Restaurant",
  description: "Restaurant Tunisien à Paris, offrant une expérience culinaire unique au cœur de la ville. Découvrez nos plats traditionnels revisités avec une touche moderne, dans un cadre chaleureux et convivial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
