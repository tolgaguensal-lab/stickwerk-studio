import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";
import "./globals.css";

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
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
