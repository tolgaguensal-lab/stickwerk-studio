"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useMockup } from "./mockup-provider";
import { renderFullPatch } from "@/lib/patch-renderer";

export default function MockupPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useMockup();
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  // Bild laden
  useEffect(() => {
    if (!state.imageUrl) {
      setImg(null);
      return;
    }
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => setImg(image);
    image.src = state.imageUrl;
  }, [state.imageUrl]);

  // Canvas-Größe an Container anpassen
  const [dim, setDim] = useState({ w: 400, h: 380 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setDim({ w: Math.min(w, 500), h: Math.min(w * 0.9, 480) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rendern
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dim.w;
    canvas.height = dim.h;

    // Hintergrund
    ctx.fillStyle = "#141413";
    ctx.fillRect(0, 0, dim.w, dim.h);

    if (!img && !state.imageUrl) {
      // Placeholder
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Design hochladen ↑", dim.w / 2, dim.h / 2 - 10);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.font = "12px sans-serif";
      ctx.fillText("dann erscheint hier die Vorschau", dim.w / 2, dim.h / 2 + 20);
      return;
    }

    renderFullPatch(ctx, dim.w, dim.h, {
      image: img,
      shape: state.shape,
      border: state.border,
      material: state.material,
      sizeCm: state.sizeCm,
      showLabel: true,
    });
  }, [dim, state.shape, state.border, state.material, state.sizeCm, img, state.imageUrl]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `stickwerk-patch-${state.shape}-${state.sizeCm}cm.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [state.shape, state.sizeCm]);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl border border-border shadow-xl"
        style={{ aspectRatio: `${dim.w} / ${dim.h}` }}
      />

      {/* Größen-Indikator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-xs text-foreground/60">
          {state.sizeCm} cm · {state.material}
        </div>
      </div>

      {/* Download-Button */}
      {state.imageUrl && (
        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/90 transition-colors shadow-lg"
        >
          PNG speichern
        </button>
      )}
    </div>
  );
}
