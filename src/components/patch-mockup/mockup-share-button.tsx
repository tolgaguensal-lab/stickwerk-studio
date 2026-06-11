"use client";

import { useCallback, useState } from "react";
import { useMockup } from "./mockup-provider";
import { Download, Share2, Check, Loader2 } from "lucide-react";

export default function MockupShareButton() {
  const { state } = useMockup();
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    setSaving(true);
    // Kurze Verzögerung für UI-Feedback
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `stickwerk-patch-${state.shape}-${state.sizeCm}cm.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setSaving(false);
    }, 300);
  }, [state.shape, state.sizeCm]);

  const handleShare = useCallback(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) return;

      const file = new File([blob], `stickwerk-patch-${state.shape}-${state.sizeCm}cm.png`, {
        type: "image/png",
      });

      if (navigator.share) {
        await navigator.share({
          title: "Stickwerk Patch",
          text: "Mein individueller Patch bei Stickwerk-Studio",
          files: [file],
        });
      } else {
        // Fallback: In Zwischenablage kopieren
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Benutzer abgebrochen oder kein Share-Support
    }
  }, [state.shape, state.sizeCm]);

  if (!state.imageUrl) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownload}
        disabled={saving}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-all disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {saving ? "Wird erstellt…" : "PNG herunterladen"}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border text-foreground/70 font-medium text-sm hover:border-accent/40 hover:text-accent transition-all"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {copied ? "Kopiert!" : "Teilen"}
      </button>
    </div>
  );
}
