"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────
interface PatchPreviewProps {
  productType: "patch" | "nametag";
  shape?: string;
  size?: string;
  complexity?: string;
  colors?: number;
  material?: string;
  edge?: string;
  backing?: string;
  nametagSize?: string;
  quantity?: number;
  express?: string;
}

// ─── Color palettes ──────────────────────────────────────────────────────
const PATCH_COLORS = [
  "#8A6A3F", // Goldbraun (accent)
  "#2D2823", // Tiefes Espresso
  "#6B4C3A", // Warmes Braun
  "#4A6B4A", // Salbeigrün
  "#6B4A6B", // Aubergine
  "#4A6B7A", // Stahlblau
  "#8A3A3A", // Gedecktes Rot
  "#7A6B4A", // Oliv
  "#3A4A5A", // Dunkelblau
  "#5A4A3A", // Tabak
  "#7A5A3A", // Kupfer
  "#3A5A4A", // Tannengrün
];

const NAMETAG_BASE_COLORS = ["#F7F1E6", "#FFF8EC", "#EFE3D0", "#E8E0D8"];

// ─── Shape SVGs ──────────────────────────────────────────────────────────
function getShapePath(shapeId: string, w: number, h: number): string {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.42;

  switch (shapeId) {
    case "circle":
      return `<circle cx="${cx}" cy="${cy}" r="${r}" />`;
    case "rectangle":
      return `<rect x="${cx - r}" y="${cy - r * 0.75}" width="${r * 2}" height="${r * 1.5}" rx="8" />`;
    case "shield":
      return `<path d="M ${cx} ${cy - r * 0.9} L ${cx + r * 0.85} ${cy - r * 0.3} L ${cx + r * 0.75} ${cy + r * 0.7} L ${cx} ${cy + r * 0.9} L ${cx - r * 0.75} ${cy + r * 0.7} L ${cx - r * 0.85} ${cy - r * 0.3} Z" />`;
    case "oval":
      return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.65}" />`;
    case "diamond":
      return `<polygon points="${cx},${cy - r} ${cx + r * 0.7},${cy} ${cx},${cy + r} ${cx - r * 0.7},${cy}" />`;
    case "custom":
      return `<rect x="${cx - r * 0.6}" y="${cy - r * 0.6}" width="${r * 1.2}" height="${r * 1.2}" rx="12" stroke-dasharray="8,4" />`;
    default:
      return `<rect x="${cx - r * 0.7}" y="${cy - r * 0.7}" width="${r * 1.4}" height="${r * 1.4}" rx="8" />`;
  }
}

function getEdgeClass(edgeId: string): string {
  switch (edgeId) {
    case "merrow": return "4 3";
    case "zigzag": return "6 2";
    case "heat_seal": return "1 0";
    case "none": return "2 6";
    default: return "3 2";
  }
}

function getEdgeStroke(edgeId: string): string {
  switch (edgeId) {
    case "merrow": return "2.5";
    case "zigzag": return "2";
    case "heat_seal": return "3";
    case "none": return "1";
    default: return "2";
  }
}

function getSizeScale(sizeId: string): number {
  switch (sizeId) {
    case "xl": return 1.15;
    case "large": return 1.0;
    case "medium": return 0.82;
    default: return 0.65;
  }
}

// ─── Component ───────────────────────────────────────────────────────────
export default function PatchPreview({
  productType,
  shape = "circle",
  size = "small",
  complexity = "low",
  colors = 2,
  material = "twill",
  edge = "standard",
  backing = "sewn",
  nametagSize = "small",
  quantity = 10,
  express = "none",
}: PatchPreviewProps) {
  const W = 280;
  const H = 240;

  const palette = useMemo(() => {
    const count = Math.min(colors || 2, 12);
    // Warm, earthy palette
    const base = ["#8A6A3F", "#2D2823", "#6B4C3A", "#4A6B4A", "#6B4A6B", "#4A6B7A"];
    return Array.from({ length: count }, (_, i) => PATCH_COLORS[i % PATCH_COLORS.length]);
  }, [colors]);

  const svgShape = useMemo(() => {
    const cx = W / 2;
    const cy = H / 2;
    const scale = productType === "nametag" ? 0.85 : getSizeScale(size);

    if (productType === "nametag") {
      // Name tag proportions differ by size
      const sizes: Record<string, { w: number; h: number }> = {
        mini: { w: 70, h: 200 },
        small: { w: 85, h: 210 },
        medium: { w: 100, h: 220 },
        large: { w: 120, h: 230 },
      };
      const dim = sizes[nametagSize] || sizes.small;
      const sw = dim.w * scale;
      const sh = dim.h * scale;
      const x = cx - sw / 2;
      const y = cy - sh / 2;
      return { type: "nametag" as const, x, y, w: sw, h: sh };
    }

    const r = Math.min(W, H) * 0.38;
    const sr = r * scale;

    switch (shape) {
      case "circle":
        return { type: "circle" as const, cx, cy, r: sr };
      case "rectangle":
        return { type: "rect" as const, cx, cy, w: sr * 2, h: sr * 1.4, rx: 6 };
      case "shield":
        return { type: "shield" as const, cx, cy, r: sr };
      case "oval":
        return { type: "oval" as const, cx, cy, rx: sr, ry: sr * 0.65 };
      case "diamond":
        return { type: "diamond" as const, cx, cy, r: sr };
      case "custom":
        return { type: "custom" as const, cx, cy, r: sr * 1.1, rx: 10 };
      default:
        return { type: "rect" as const, cx, cy, w: sr * 1.4, h: sr * 1.4, rx: 6 };
    }
  }, [productType, shape, size, nametagSize]);

  const fabricGradient = useMemo(() => {
    const id = `fabric-${Math.random().toString(36).slice(2, 8)}`;
    const baseColor = productType === "nametag"
      ? "#F7F1E6"
      : material === "leather"
        ? "#3A2A1A"
        : material === "felt"
          ? "#C8B89A"
          : material === "denim"
            ? "#4A5A7A"
            : material === "canvas"
              ? "#D8C8A8"
              : material === "reflective"
                ? "#B0B8C8"
                : "#F0E8D8"; // twill default
    return { id, baseColor };
  }, [material, productType]);

  const edgeDash = getEdgeClass(edge);
  const edgeStrokeW = getEdgeStroke(edge);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex justify-center"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[240px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fabric gradient */}
          <linearGradient id={`${fabricGradient.id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fabricGradient.baseColor} stopOpacity="1" />
            <stop offset="50%" stopColor={adjustColor(fabricGradient.baseColor, 10)} stopOpacity="1" />
            <stop offset="100%" stopColor={adjustColor(fabricGradient.baseColor, -8)} stopOpacity="1" />
          </linearGradient>

          {/* Fabric noise texture */}
          <pattern id={`${fabricGradient.id}-noise`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            {Array.from({ length: 4 }).map((_, i) =>
              Array.from({ length: 4 }).map((_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={i * 4 + 1}
                  cy={j * 4 + 1}
                  r="0.4"
                  fill={fabricGradient.baseColor}
                  opacity={0.15}
                />
              ))
            )}
          </pattern>

          {/* Drop shadow */}
          <filter id={`${fabricGradient.id}-shadow`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2D2823" floodOpacity="0.2" />
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#2D2823" floodOpacity="0.15" />
          </filter>

          {/* Stitch pattern */}
          <pattern id={`${fabricGradient.id}-stitch`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="6" y2="6" stroke="#8A6A3F" strokeWidth="0.5" opacity="0.15" />
          </pattern>
        </defs>

        {productType === "patch" ? (
          <g filter={`url(#${fabricGradient.id}-shadow)`}>
            {/* Outer border / edge */}
            {renderPatchShape(svgShape as Extract<typeof svgShape, { type: string }>, {
              fill: "none",
              stroke: getEdgeColor(edge, material),
              strokeWidth: edgeStrokeW,
              strokeDasharray: edge === "none" ? "none" : edgeDash,
              opacity: 0.8,
            })}

            {/* Main fabric fill */}
            {renderPatchShape(svgShape as Extract<typeof svgShape, { type: string }>, {
              fill: `url(#${fabricGradient.id}-grad)`,
              stroke: "none",
            })}

            {/* Noise overlay */}
            {renderPatchShape(svgShape as Extract<typeof svgShape, { type: string }>, {
              fill: `url(#${fabricGradient.id}-noise)`,
              stroke: "none",
            })}

            {/* Stitch overlay */}
            {renderPatchShape(svgShape as Extract<typeof svgShape, { type: string }>, {
              fill: `url(#${fabricGradient.id}-stitch)`,
              stroke: "none",
            })}

            {/* Inner stitching line */}
            {renderPatchShape(svgShape as Extract<typeof svgShape, { type: string }>, {
              fill: "none",
              stroke: "#8A6A3F",
              strokeWidth: 1,
              strokeDasharray: "3,3",
              opacity: 0.4,
              scale: 0.92,
            })}

            {/* Color dots */}
            {palette.map((color, i) => {
              const angle = (i / palette.length) * Math.PI * 2 - Math.PI / 2;
              const spokeR = shape === "circle" ? 40 : 30;
              const cx2 = W / 2 + Math.cos(angle) * spokeR;
              const cy2 = H / 2 + Math.sin(angle) * spokeR;
              return (
                <g key={i}>
                  <circle cx={cx2} cy={cy2} r="8" fill={color} stroke="#FFF" strokeWidth="1.5" />
                  <circle cx={cx2} cy={cy2} r="3" fill={color} opacity="0.6" />
                </g>
              );
            })}

            {/* Center label */}
            <text
              x={W / 2}
              y={H / 2 + 32}
              textAnchor="middle"
              fill="#2D2823"
              fontSize="11"
              fontFamily="serif"
              opacity="0.5"
            >
              {material === "twill" ? "Twill" :
               material === "leather" ? "Leder" :
               material === "felt" ? "Vlies" :
               material === "denim" ? "Denim" :
               material === "reflective" ? "Reflekt." :
               material === "canvas" ? "Canvas" : ""}
            </text>
          </g>
        ) : (
          /* ─── Name Tag Preview ─── */
          <g filter={`url(#${fabricGradient.id}-shadow)`}>
            {(() => {
              const s = svgShape as Extract<typeof svgShape, { type: "nametag" }>;
              const cornerR = 6;
              return (
                <>
                  {/* Name tag body */}
                  <rect
                    x={s.x}
                    y={s.y}
                    width={s.w}
                    height={s.h}
                    rx={cornerR}
                    fill={`url(#${fabricGradient.id}-grad)`}
                    stroke="#8A6A3F"
                    strokeWidth="2"
                  />
                  {/* Noise */}
                  <rect
                    x={s.x}
                    y={s.y}
                    width={s.w}
                    height={s.h}
                    rx={cornerR}
                    fill={`url(#${fabricGradient.id}-noise)`}
                  />
                  {/* Stitching */}
                  <rect
                    x={s.x + 4}
                    y={s.y + 4}
                    width={s.w - 8}
                    height={s.h - 8}
                    rx={cornerR - 2}
                    fill="none"
                    stroke="#8A6A3F"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                    opacity="0.5"
                  />

                  {/* Placeholder text lines */}
                  <line x1={s.x + s.w * 0.25} y1={s.y + s.h * 0.35} x2={s.x + s.w * 0.75} y2={s.y + s.h * 0.35}
                    stroke="#2D2823" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                  <line x1={s.x + s.w * 0.3} y1={s.y + s.h * 0.5} x2={s.x + s.w * 0.7} y2={s.y + s.h * 0.5}
                    stroke="#2D2823" strokeWidth="1.8" strokeLinecap="round" opacity="0.2" />
                  <line x1={s.x + s.w * 0.35} y1={s.y + s.h * 0.62} x2={s.x + s.w * 0.65} y2={s.y + s.h * 0.62}
                    stroke="#2D2823" strokeWidth="1.2" strokeLinecap="round" opacity="0.15" />

                  {/* Backing indicator */}
                  <text
                    x={W / 2}
                    y={s.y + s.h + 18}
                    textAnchor="middle"
                    fill="#8A6A3F"
                    fontSize="9"
                    fontFamily="sans-serif"
                    opacity="0.5"
                  >
                    {backing === "sewn" ? "Zum Aufnähen" :
                     backing === "iron" ? "Bügelrückseite" :
                     backing === "velcro" ? "Klettverschluss" :
                     backing === "magnetic" ? "Magnet" : ""}
                  </text>
                </>
              );
            })()}
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function getEdgeColor(edgeId: string, material: string): string {
  if (edgeId === "merrow") return "#B8A080";
  if (edgeId === "heat_seal") return "#4A3A2A";
  if (material === "leather") return "#2A1A0A";
  return "#A09080";
}

function renderPatchShape(
  shape: { type: string; cx?: number; cy?: number; r?: number; w?: number; h?: number; rx?: number; ry?: number },
  attrs: Record<string, string | number | undefined>,
) {
  const { type, cx = 140, cy = 120, r = 60, w = 120, h = 100, rx = 8, ry = 40 } = shape;
  const scale = (attrs.scale as number) || 1;
  const attrStr = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && typeof v !== "boolean")
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");

  const svgStr = (() => {
    switch (type) {
      case "circle":
        return `<circle cx="${cx}" cy="${cy}" r="${r * scale}" ${attrStr} />`;
      case "rect":
        return `<rect x="${cx - (w / 2) * scale}" y="${cy - (h / 2) * scale}" width="${w * scale}" height="${h * scale}" rx="${typeof rx === 'number' ? rx : 6}" ${attrStr} />`;
      case "shield": {
        const sr = r * scale;
        return `<path d="M ${cx} ${cy - sr * 0.9} L ${cx + sr * 0.85} ${cy - sr * 0.3} L ${cx + sr * 0.75} ${cy + sr * 0.7} L ${cx} ${cy + sr * 0.9} L ${cx - sr * 0.75} ${cy + sr * 0.7} L ${cx - sr * 0.85} ${cy - sr * 0.3} Z" ${attrStr} />`;
      }
      case "oval":
        return `<ellipse cx="${cx}" cy="${cy}" rx="${r * scale}" ry="${ry * scale}" ${attrStr} />`;
      case "diamond":
        return `<polygon points="${cx},${cy - r * scale} ${cx + r * 0.7 * scale},${cy} ${cx},${cy + r * scale} ${cx - r * 0.7 * scale},${cy}" ${attrStr} />`;
      case "custom":
        return `<rect x="${cx - r * 0.6 * scale}" y="${cy - r * 0.6 * scale}" width="${r * 1.2 * scale}" height="${r * 1.2 * scale}" rx="12" stroke-dasharray="8,4" ${attrStr} />`;
      default:
        return `<rect x="${cx - 50 * scale}" y="${cy - 50 * scale}" width="${100 * scale}" height="${100 * scale}" rx="6" ${attrStr} />`;
    }
  })();

  // Use dangerouslySetInnerHTML approach - but we'll return via a fragment
  // Instead, let's return the raw string for the component to use
  return <g dangerouslySetInnerHTML={{ __html: svgStr.replace(/scale="[^"]*"/, '') }} />;
}
