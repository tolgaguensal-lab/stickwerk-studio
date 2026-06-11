"use client";

import { useCallback, useRef, useState } from "react";
import { useMockup } from "./mockup-provider";
import { extractColors } from "@/lib/patch-renderer";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MockupUploader() {
  const { state, setImageFromFile, dispatch } = useMockup();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setImageFromFile(file);
    },
    [setImageFromFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    dispatch({ type: "SET_IMAGE", imageUrl: null, imageData: null as unknown as ImageData });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleExtractColors = () => {
    if (!state.imageData) return;
    const colors = extractColors(state.imageData, 8);
    dispatch({ type: "SET_COLORS", colors: colors.length });
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200",
          "flex flex-col items-center justify-center p-8 min-h-[280px]",
          dragging
            ? "border-accent bg-accent/10"
            : state.imageUrl
              ? "border-accent/40 bg-accent/5"
              : "border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {state.imageUrl ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <img
              src={state.imageUrl}
              alt="Uploaded design"
              className="max-h-[220px] max-w-full rounded-xl object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-xs text-foreground/50 mt-2">
              Klicken zum Ersetzen · Ziehen zum Ändern
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">
                Design hochladen
              </p>
              <p className="text-sm text-foreground/50">
                Klicken oder PNG/JPG/SVG hierher ziehen
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-foreground/40">
              <span className="px-2 py-1 rounded-md bg-foreground/5">PNG</span>
              <span className="px-2 py-1 rounded-md bg-foreground/5">JPG</span>
              <span className="px-2 py-1 rounded-md bg-foreground/5">SVG</span>
            </div>
          </div>
        )}
      </div>

      {/* Farben extrahieren */}
      {state.imageUrl && (
        <button
          onClick={handleExtractColors}
          className="w-full p-3 rounded-xl border border-border text-sm text-foreground/70 hover:border-accent/40 hover:bg-accent/5 transition-all flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4 text-accent" />
          Farbpalette aus Bild extrahieren
        </button>
      )}
    </div>
  );
}
