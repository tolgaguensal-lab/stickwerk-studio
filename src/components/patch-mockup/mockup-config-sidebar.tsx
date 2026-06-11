"use client";

import { useMockup } from "./mockup-provider";
import { getShapeLabel } from "@/lib/patch-renderer/shapes";
import { getMaterialLabel } from "@/lib/patch-renderer/textures";
import { getBorderLabel } from "@/lib/patch-renderer/borders";
import { calculatePrice } from "@/lib/patch-renderer";
import {
  Circle, Square, Shield, Diamond,
  Move, Ruler, Palette, Package,
  Zap, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PatchShape, PatchBorder, PatchMaterial } from "@/lib/patch-renderer";

// ─── Shape Picker ───
const SHAPES: { id: PatchShape; icon: React.ReactNode }[] = [
  { id: "circle", icon: <Circle className="w-5 h-5" /> },
  { id: "shield", icon: <Shield className="w-5 h-5" /> },
  { id: "rectangle", icon: <Square className="w-5 h-5" /> },
  { id: "diamond", icon: <Diamond className="w-5 h-5" /> },
  { id: "oval", icon: <Circle className="w-5 h-5 rotate-45" /> },
];

function ShapePicker() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Move className="w-3.5 h-3.5" /> Form
      </label>
      <div className="grid grid-cols-5 gap-2">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            onClick={() => dispatch({ type: "SET_SHAPE", shape: s.id })}
            className={cn(
              "flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all",
              state.shape === s.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-border hover:border-foreground/30 text-foreground/60",
            )}
          >
            <span className={cn(
              state.shape === s.id ? "text-accent" : "text-foreground/60"
            )}>
              {s.icon}
            </span>
            <span className="text-[10px] font-medium">{getShapeLabel(s.id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Border Picker ───
const BORDERS: PatchBorder[] = ["merrow", "standard", "zigzag", "heat_seal", "none"];

function BorderPicker() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Tag className="w-3.5 h-3.5" /> Rand
      </label>
      <div className="grid grid-cols-5 gap-1.5">
        {BORDERS.map((b) => (
          <button
            key={b}
            onClick={() => dispatch({ type: "SET_BORDER", border: b })}
            className={cn(
              "px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
              state.border === b
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-foreground/50 hover:border-foreground/30",
            )}
          >
            {getBorderLabel(b)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Size Slider ───
function SizeSlider() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Ruler className="w-3.5 h-3.5" /> Größe: {state.sizeCm} cm
      </label>
      <input
        type="range"
        min={3}
        max={20}
        step={1}
        value={state.sizeCm}
        onChange={(e) => dispatch({ type: "SET_SIZE", size: parseInt(e.target.value) })}
        className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-[10px] text-foreground/40">
        <span>3 cm</span>
        <span>20 cm</span>
      </div>
    </div>
  );
}

// ─── Material Picker ───
const MATERIALS: PatchMaterial[] = ["twill", "leather", "denim", "canvas", "felt", "reflective"];

function MaterialPicker() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Palette className="w-3.5 h-3.5" /> Material
      </label>
      <div className="grid grid-cols-3 gap-1.5">
        {MATERIALS.map((m) => (
          <button
            key={m}
            onClick={() => dispatch({ type: "SET_MATERIAL", material: m })}
            className={cn(
              "px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
              state.material === m
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-foreground/50 hover:border-foreground/30",
            )}
          >
            {getMaterialLabel(m)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Colors Slider ───
function ColorsSlider() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Palette className="w-3.5 h-3.5" /> Farben: {state.colors}
      </label>
      <input
        type="range"
        min={1}
        max={12}
        value={state.colors}
        onChange={(e) => dispatch({ type: "SET_COLORS", colors: parseInt(e.target.value) })}
        className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-[10px] text-foreground/40">
        <span>1</span>
        <span>12</span>
      </div>
      {/* Mini-Farbpalette */}
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: state.colors }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border border-border"
            style={{ backgroundColor: `hsl(${i * 30 + 20}, 60%, 45%)` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Quantity ───
function QuantitySelect() {
  const { state, dispatch } = useMockup();
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Package className="w-3.5 h-3.5" /> Menge: {state.quantity}
      </label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: "SET_QUANTITY", quantity: Math.max(10, state.quantity - 10) })}
          disabled={state.quantity <= 10}
          className="w-10 h-10 rounded-xl border-2 border-border text-foreground/70 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-lg"
        >
          −
        </button>
        <input
          type="range"
          min={10}
          max={500}
          step={10}
          value={state.quantity}
          onChange={(e) => dispatch({ type: "SET_QUANTITY", quantity: parseInt(e.target.value) })}
          className="flex-1 h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
        />
        <button
          onClick={() => dispatch({ type: "SET_QUANTITY", quantity: Math.min(500, state.quantity + 10) })}
          className="w-10 h-10 rounded-xl border-2 border-border text-foreground/70 hover:border-accent hover:text-accent transition-all flex items-center justify-center text-lg"
        >
          +
        </button>
      </div>
      {/* Staffelpreise */}
      <div className="grid grid-cols-3 gap-1">
        {[
          { threshold: 20, discount: "−10%" },
          { threshold: 50, discount: "−20%" },
          { threshold: 100, discount: "−30%" },
        ].map((tier) => (
          <div
            key={tier.threshold}
            className={cn(
              "px-2 py-1 rounded-md text-[10px] text-center border",
              state.quantity >= tier.threshold
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border text-foreground/40",
            )}
          >
            ab {tier.threshold}
            <br />
            {tier.discount}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Express ───
function ExpressSelect() {
  const { state, dispatch } = useMockup();
  const options = [
    { id: "none" as const, label: "Standard", time: "7-10 Werktage", price: "−" },
    { id: "express" as const, label: "Express", time: "3-5 Werktage", price: "+50%" },
    { id: "super_express" as const, label: "Super Express", time: "24-48h", price: "+100%" },
  ];
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-foreground/60 uppercase tracking-wider">
        <Zap className="w-3.5 h-3.5" /> Express
      </label>
      <div className="grid grid-cols-3 gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => dispatch({ type: "SET_EXPRESS", express: opt.id })}
            className={cn(
              "px-2 py-2 rounded-xl text-center border transition-all",
              state.express === opt.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-foreground/50 hover:border-foreground/30",
            )}
          >
            <div className="text-[11px] font-medium">{opt.label}</div>
            <div className="text-[9px] opacity-60">{opt.time}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Price Display ───
function PriceDisplay() {
  const { state } = useMockup();
  const price = calculatePrice({
    shape: state.shape,
    size: state.sizeCm,
    colors: state.colors,
    border: state.border,
    material: state.material,
    quantity: state.quantity,
    express: state.express,
  });

  return (
    <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-foreground/60">Einzelpreis</span>
        <span className="text-lg font-bold text-foreground">{price.unitPrice.toFixed(2)} €</span>
      </div>
      {price.discount > 0 && (
        <div className="flex items-baseline justify-between text-accent">
          <span className="text-sm">Mengenrabatt</span>
          <span className="text-sm font-semibold">−{price.discount}%</span>
        </div>
      )}
      <div className="border-t border-accent/20 pt-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">Gesamt (netto)</span>
        <span className="text-2xl font-bold text-accent">
          {price.totalPrice.toFixed(2)} €
        </span>
      </div>
      <p className="text-[10px] text-foreground/40 text-center">
        *unverbindliche Kostenschätzung · inkl. MwSt.
      </p>
    </div>
  );
}

// ─── Main Sidebar ───
export default function MockupConfigSidebar() {
  return (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold text-foreground">Patch konfigurieren</h3>
        <p className="text-xs text-foreground/50">Wähle Form, Material und Größe</p>
      </div>
      <ShapePicker />
      <BorderPicker />
      <SizeSlider />
      <MaterialPicker />
      <ColorsSlider />
      <QuantitySelect />
      <ExpressSelect />
      <PriceDisplay />
    </div>
  );
}
