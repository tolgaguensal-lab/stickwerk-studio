import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DirectionalPage } from "@/components/DirectionalPage";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
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
        url: "https://sws.guenlab.de/brand/logo-full.svg",
        width: 280,
        height: 64,
        alt: "Stickwerk-Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stickwerk-Studio | Maschinenstickerei & Custom Patches",
    description: "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region.",
    images: ["https://sws.guenlab.de/brand/logo-full.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/brand/logo-mark.svg",
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
        <meta name="theme-color" content="#F7F1E6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Stickwerk-Studio",
              description:
                "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region.",
              url: "https://sws.guenlab.de",
              email: "info@stickwerk-studio.de",
              image: "https://sws.guenlab.de/brand/logo-full.svg",
              priceRange: "€€",
              areaServed: { "@type": "Country", name: "DE" },
            }),
          }}
        />
        {/* Analytics & Tracking werden client-seitig basierend auf Cookie-Consent geladen */}
      </head>
      <body 
        className={`${inter.variable} ${playfairDisplay.variable} ${jetBrainsMono.variable} antialiased`}
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        }}
      >
        <AnalyticsLoader />
        <CookieConsent />
        <SmoothScroll>
          <Scene />
          <Navbar />
          <DirectionalPage>
            <div className="pt-[72px] lg:pt-[72px]">
              {children}
            </div>
          </DirectionalPage>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
