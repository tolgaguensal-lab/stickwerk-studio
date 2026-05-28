import React from "react";
import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stickwerk-Studio | Maschinenstickerei & Custom Patches",
  description: "Professionelle Maschinenstickerei, Custom Patches und Textilbranding für die DACH-Region. Fäden, die Marken sichtbar machen.",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased">
        <SmoothScroll>
          <Scene />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
