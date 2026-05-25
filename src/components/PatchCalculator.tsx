import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Info, Send } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui buttons, fallback to standard if not
import { Card } from "@/components/ui/card";

// --- Configuration & Pricing Logic ---
const CONFIG = {
  shapes: [
    { id: "circle", label: "Rund", icon: "⚪", basePrice: 10, description: "Klassisch & Zeitlos" },
    { id: "rectangle", label: "Rechteckig", icon: "⬜", basePrice: 10, description: "Modern & Klar" },
    { id: "shield", label: "Schild", icon: "🛡️", basePrice: 12, description: "Traditionell & Stark" },
    { id: "custom", label: "Individuell", icon: "🎨", basePrice: 15, description: "Einzigartige Form" },
  ],
  sizes: [
    { id: "small", label: "Klein", value: 5, description: "ca. 5cm - Ideal für Caps" },
    { id: "medium", label: "Mittel", value: 1.5, description: "ca. 8-10cm - Standard" },
    { id: "large", label: "Groß", value: 2.5, description: "ab 12cm - Statement Piece" },
  ],
  complexities: [
    { id: "simple", label: "Einfach", multiplier: 1, description: "1-2 Farben, klare Linien" },
    { id: "medium", label: "Mittel", multiplier: 1.3, description: "Mehr Details, mittlere Farbzählung" },
    { id: "high", label: "Hoch", multiplier: 1.8, description: "Feine Details, viele Farben" },
  ],
  backings: [
    { id: "velcro", label: "Klett", price: 2, description: "Flexibel abnehmbar" },
    { id: "iron-on", label: "Bügelbar", price: 1, description: "Schnell & Einfach" },
    { id: "sewn", label: "Zum Aufnähen", price: 0, description: "Klassisch & Dauerhaft" },
  ],
};

export default function PatchCalculator() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    shape: "circle",
    size: "medium",
    complexity: "simple",
    backing: "sewn",
    quantity: 10,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Price Calculation Engine
  useEffect(() => {
    const shapeObj = CONFIG.shapes.find(s => s.id === selections.shape);
    const sizeObj = CONFIG.sizes.find(s => s.id === selections.size);
    const compObj = CONFIG.complexities.find(c => c.id === selections.complexity);
    const backObj = CONFIG.backings.find(b => b.id === selections.backing);

    // Base Logic: (Base + SizeFactor) * Complexity * Quantity + Backing
    const base = (shapeObj?.basePrice || 10) * (sizeObj?.value || 1);
    const perUnit = (base * (compObj?.multiplier || 1)) + (backObj?.price || 0);
    
    // Quantity Discount (Degressive)
    let quantityMultiplier = 1;
    if (selections.quantity >= 100) quantityMultiplier = 0.6;
    else if (selections.quantity >= 50) quantityMultiplier = 0.8;
    else if (selections.quantity >= 20) quantityMultiplier = 0.9;

    setTotalPrice(Math.round(perUnit * selections.quantity * quantityMultiplier));
  }, [selections]);

  const updateSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-12">
      {/* Progress Bar */}
      <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Configurator Area */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif font-bold text-primary">1. Die Form wählen</h3>
                <div className="grid grid-cols-2 gap-4">
                  {CONFIG.shapes.map(shape => (
                    <div 
                      key={shape.id}
                      onClick={() => updateSelection("shape", shape.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${selections.shape === shape.id ? "border-accent bg-accent/10 shadow-md" : "border-primary/10 hover:border-primary/30 bg-white"}`}
                    >
                      <div className="text-3xl mb-2">{shape.icon}</div>
                      <div className="font-bold text-primary">{shape.label}</div>
                      <div className="text-xs text-foreground/60">{shape.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif font-bold text-primary">2. Die Größe bestimmen</h3>
                <div className="grid grid-cols-1 gap-4">
                  {CONFIG.sizes.map(size => (
                    <div 
                      key={size.id}
                      onClick={() => updateSelection("size", size.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selections.size === size.id ? "border-accent bg-accent/10 shadow-md" : "border-primary/10 hover:border-primary/30 bg-white"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${selections.size === size.id ? "bg-accent" : "bg-primary/20"}`} />
                        <div>
                          <div className="font-bold text-primary">{size.label}</div>
                          <div className="text-xs text-foreground/60">{size.description}</div>
                        </div>
                      </div>
                      {selections.size === size.id && <Check className="text-accent w-5 h-5" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif font-bold text-primary">3. Detailgrad & Komplexität</h3>
                <div className="grid grid-cols-1 gap-4">
                  {CONFIG.complexities.map(comp => (
                    <div 
                      key={comp.id}
                      onClick={() => updateSelection("complexity", comp.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selections.complexity === comp.id ? "border-accent bg-accent/10 shadow-md" : "border-primary/10 hover:border-primary/30 bg-white"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${selections.complexity === comp.id ? "bg-accent" : "bg-primary/20"}`} />
                        <div>
                          <div className="font-bold text-primary">{comp.label}</div>
                          <div className="text-xs text-foreground/60">{comp.description}</div>
                        </div>
                      </div>
                      {selections.complexity === comp.id && <Check className="text-accent w-5 h-5" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif font-bold text-primary">4. Die Rückseite</h3>
                <div className="grid grid-cols-1 gap-4">
                  {CONFIG.backings.map(back => (
                    <div 
                      key={back.id}
                      onClick={() => updateSelection("backing", back.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selections.backing === back.id ? "border-accent bg-accent/10 shadow-md" : "border-primary/10 hover:border-primary/30 bg-white"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${selections.backing === back.id ? "bg-accent" : "bg-primary/20"}`} />
                        <div>
                          <div className="font-bold text-primary">{back.label}</div>
                          <div className="text-xs text-foreground/60">{back.description}</div>
                        </div>
                      </div>
                      {selections.backing === back.id && <Check className="text-accent w-5 h-5" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif font-bold text-primary">5. Menge festlegen</h3>
                <div className="flex flex-col items-center gap-8 p-8 bg-white rounded-3xl border-2 border-primary/10">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setSelections(p => ({...p, quantity: Math.max(1, p.quantity - 1)}))}
                      className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold"
                    >-</button>
                    <span className="text-4xl font-serif font-bold text-primary w-20 text-center">{selections.quantity}</span>
                    <button 
                      onClick={() => setSelections(p => ({...p, quantity: p.quantity + 1}))}
                      className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold"
                    >+</button>
                  </div>
                  <p className="text-sm text-foreground/60 italic">Tipp: Ab 20, 50 und 100 Stück sinkt der Stückpreis automatisch.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8">
            <Button 
              variant="ghost" 
              onClick={() => setStep(s => s - 1)} 
              disabled={step === 1}
              className="flex items-center gap-2 text-primary hover:bg-primary/5"
            >
              <ChevronLeft className="w-4 h-4" /> Zurück
            </Button>
            
            {step < 5 ? (
              <Button 
                onClick={() => setStep(s => s + 1)}
                className="bg-primary text-background hover:bg-primary/90 flex items-center gap-2 px-8 rounded-full"
              >
                Weiter <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                className="bg-accent text-primary hover:bg-accent/90 flex items-center gap-2 px-8 rounded-full font-bold"
                onClick={() => {
                  // Final action: trigger lead form
                  window.location.href = "#contact";
                }}
              >
                Anfrage absenden <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Summary Card (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-3xl bg-primary text-background shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-serif font-bold">Deine Auswahl</h4>
              <Info className="w-5 h-5 text-accent" />
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-primary/20 pb-2">
                <span className="text-background/60">Form:</span>
                <span className="font-medium">{CONFIG.shapes.find(s=>s.id===selections.shape)?.label}</span>
              </div>
              <div className="flex justify-between border-b border-primary/20 pb-2">
                <span className="text-background/60">Größe:</span>
                <span className="font-medium">{CONFIG.sizes.find(s=>s.id===selections.size)?.label}</span>
              </div>
              <div className="flex justify-between border-b border-primary/20 pb-2">
                <span className="text-background/60">Komplexität:</span>
                <span className="font-medium">{CONFIG.complexities.find(c=>c.id===selections.complexity)?.label}</span>
              </div>
              <div className="flex justify-between border-b border-primary/20 pb-2">
                <span className="text-background/60">Rückseite:</span>
                <span className="font-medium">{CONFIG.backings.find(b=>b.id===selections.backing)?.label}</span>
              </div>
              <div className="flex justify-between border-b border-primary/20 pb-2">
                <span className="text-background/60">Menge:</span>
                <span className="font-medium">{selections.quantity} Stk.</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="text-xs uppercase tracking-widest text-accent font-bold mb-1">Geschätzter Preis</div>
              <div className="text-4xl font-serif font-bold">{totalPrice} €</div>
              <p className="text-[10px] text-background/50 mt-2 italic">
                Unverbindliche Schätzung. Finaler Preis nach Sichtung des Motivs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
