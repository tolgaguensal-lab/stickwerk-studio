import type { ExtractedColor } from "./types";

/**
 * Extrahiert die n häufigsten Farben aus ImageData.
 * Quantisiert auf 20er-Schritte, um Rauschen zu reduzieren.
 */
export function extractColors(
  imgData: ImageData,
  count: number,
  sampleStep = 4,
): ExtractedColor[] {
  const freq: Record<string, number> = {};

  for (let i = 0; i < imgData.data.length; i += sampleStep * 4) {
    const r = quantize(imgData.data[i]);
    const g = quantize(imgData.data[i + 1]);
    const b = quantize(imgData.data[i + 2]);
    const a = imgData.data[i + 3];
    if (a < 128) continue;

    const key = `${r},${g},${b}`;
    freq[key] = (freq[key] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      const hex = rgbToHex(r, g, b);
      return { r, g, b, hex };
    });
}

function quantize(v: number, step = 20): number {
  return Math.round(v / step) * step;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Preisberechnung (angelehnt an PatchCalculator, aber eigenständig)
 */
export function calculatePrice(config: {
  shape: string;
  size: number;
  colors: number;
  border: string;
  material: string;
  quantity: number;
  express: "none" | "express" | "super_express";
}): { unitPrice: number; totalPrice: number; discount: number } {
  // Basis-Preise
  const shapePrices: Record<string, number> = {
    circle: 5,
    rectangle: 5,
    shield: 8,
    diamond: 7,
    oval: 6,
  };

  // Größen-Multiplikator
  const sizeMultiplier =
    config.size <= 4 ? 0.8 :
    config.size <= 6 ? 1.0 :
    config.size <= 8 ? 1.15 :
    config.size <= 10 ? 1.3 :
    config.size <= 15 ? 1.7 : 2.2;

  // Farb-Multiplikator
  const colorMultiplier =
    config.colors <= 2 ? 1.0 :
    config.colors <= 4 ? 1.15 :
    config.colors <= 6 ? 1.3 : 1.5;

  // Material-Preis
  const materialPrices: Record<string, number> = {
    twill: 0, leather: 8, denim: 2, canvas: 3, felt: -2, reflective: 5,
  };

  // Border-Preis
  const borderPrices: Record<string, number> = {
    merrow: 1.5, standard: 0, zigzag: 1.0, heat_seal: 2.0, none: -0.5,
  };

  const shapeBase = shapePrices[config.shape] || 5;
  const matPrice = materialPrices[config.material] || 0;
  const borderPrice = borderPrices[config.border] || 0;

  const unitPrice =
    (shapeBase * sizeMultiplier * colorMultiplier) + matPrice + borderPrice;

  // Mengenrabatt
  let discount = 1.0;
  if (config.quantity >= 100) discount = 0.7;
  else if (config.quantity >= 50) discount = 0.8;
  else if (config.quantity >= 20) discount = 0.9;

  // Express-Aufschlag
  const expressMultiplier =
    config.express === "super_express" ? 2.0 :
    config.express === "express" ? 1.5 : 1.0;

  const discountedUnit = unitPrice * discount * expressMultiplier;
  const totalPrice = Math.round(discountedUnit * config.quantity);

  return {
    unitPrice: Math.round(discountedUnit * 100) / 100,
    totalPrice,
    discount: Math.round((1 - discount) * 100),
  };
}
