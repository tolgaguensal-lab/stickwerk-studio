import type { PatchMaterial } from "./types";

const FABRIC_COLORS: Record<PatchMaterial, { base: string; dark: string }> = {
  twill: { base: "#F0E8D8", dark: "#D8C8A8" },
  leather: { base: "#3A2A1A", dark: "#2A1A0A" },
  denim: { base: "#4A5A7A", dark: "#3A4A6A" },
  canvas: { base: "#D8C8A8", dark: "#C8B898" },
  felt: { base: "#C8B89A", dark: "#B8A88A" },
  reflective: { base: "#B0B8C8", dark: "#A0A8B8" },
};

function hexToRgb(hex: string): [number, number, number] {
  const val = parseInt(hex.replace("#", ""), 16);
  return [(val >> 16) & 0xff, (val >> 8) & 0xff, val & 0xff];
}

/** Rendert eine Stofftextur auf den Canvas (Gradient + Noise + Faden-Linien) */
export function renderFabricTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  material: PatchMaterial,
): void {
  const c = FABRIC_COLORS[material] || FABRIC_COLORS.twill;

  // Farbverlauf (Lichteinfall)
  const grad = ctx.createLinearGradient(0, 0, w, h);
  const [br, bg, bb] = hexToRgb(c.base);
  const [dr, dg, db] = hexToRgb(c.dark);
  grad.addColorStop(0, c.base);
  grad.addColorStop(0.45, `rgb(${br - 15}, ${bg - 10}, ${bb - 8})`);
  grad.addColorStop(0.55, `rgb(${dr + 10}, ${dg + 8}, ${db + 5})`);
  grad.addColorStop(1, c.dark);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Per-Pixel Noise (Stoff-Rauheit)
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 28;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  // Horizontale Faden-Linien (Kettfäden)
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 0.5;
  for (let y = 0; y < h; y += 2) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.1) * 0.5);
    ctx.lineTo(w, y + Math.sin(y * 0.1 + 1) * 0.5);
    ctx.stroke();
  }

  // Vertikale Faden-Linien (Schussfäden)
  ctx.strokeStyle = "rgba(0,0,0,0.03)";
  for (let x = 0; x < w; x += 2) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
}

/** Noise-Overlay auf ein bestehendes Canvas-Bereich (nach clip) */
export function applyNoiseOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  opacity = 0.08,
): void {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);
}

/** Gibt den Anzeigenamen eines Materials zurück */
export function getMaterialLabel(material: PatchMaterial): string {
  const labels: Record<PatchMaterial, string> = {
    twill: "Twill (Standard)",
    leather: "Leder",
    denim: "Denim",
    canvas: "Canvas",
    felt: "Vlies",
    reflective: "Reflektierend",
  };
  return labels[material];
}

/** Gibt den Basis-Preisaufschlag für ein Material zurück */
export function getMaterialPrice(material: PatchMaterial): number {
  const prices: Record<PatchMaterial, number> = {
    twill: 0,
    leather: 8,
    denim: 2,
    canvas: 3,
    felt: -2,
    reflective: 5,
  };
  return prices[material];
}
