import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import "./globals.css";

/* Fonts - Google Fonts (MIT License) */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* Metadata - DSGVO & SEO Optimiert */
export const metadata: Metadata = {
  title: {
    default: "Stickwerk-Studio | Maschinenstickerei & Custom Patches",
    template: "%s | Stickwerk-Studio",
  },
  description: "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region. Präzision, die sichtbar bleibt.",
  keywords: [
    "Maschinenstickerei",
    "Custom Patches",
    "Textilbranding",
    "Stickerei DACH",
    "Patch-Herstellung",
    "Firmenlogo sticken",
    "Werbegeschenke",
    "Textilveredelung",
  ],
  authors: [{ name: "Stickwerk-Studio" }],
  creator: "Stickwerk-Studio",
  publisher: "Stickwerk-Studio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://sws.guenlab.de",
    siteName: "Stickwerk-Studio",
    title: "Stickwerk-Studio | Maschinenstickerei & Custom Patches",
    description: "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region.",
    images: [
      {
        url: "https://sws.guenlab.de/logo.jpg",
        width: 500,
        height: 500,
        alt: "Stickwerk-Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stickwerk-Studio | Maschinenstickerei & Custom Patches",
    description: "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region.",
    images: ["https://sws.guenlab.de/logo.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.jpg",
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DSGVO: No external tracking by default */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#1A1A2E" />
      </head>
      <body 
        className={`${inter.variable} ${playfairDisplay.variable} ${jetBrainsMono.variable} antialiased`}
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        }}
      >
        <SmoothScroll>
          <Scene />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
