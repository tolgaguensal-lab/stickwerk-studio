import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Info, Send, Loader2, User, Mail, Phone, MessageSquare, Upload, Palette, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// --- Config & Logic ---
const CONFIG = {
  shapes: [
    { id: "circle", name: "Rund", icon: "◯", basePrice: 15 },
    { id: "rectangle", name: "Rechteckig", icon: "▭", basePrice: 15 },
    { id: "shield", name: "Schildform", icon: "🛡️", basePrice: 20 },
    { id: "oval", name: "Oval", icon: "🟢", basePrice: 16 },
    { id: "diamond", name: "Raute", icon: "♦", basePrice: 18 },
    { id: "custom", name: "Individuell", icon: "🎨", basePrice: 25 },
  ],
  sizes: [
    { id: "small", name: "Klein (bis 5cm)", multiplier: 1.0 },
    { id: "medium", name: "Mittel (bis 10cm)", multiplier: 1.5 },
    { id: "large", name: "Groß (bis 15cm)", multiplier: 2.2 },
    { id: "xl", name: "Extra Groß (15cm+)", multiplier: 3.0 },
  ],
  complexity: [
    { id: "low", name: "Einfach", desc: "1-2 Farben, klare Linien", multiplier: 1.0 },
    { id: "medium", name: "Mittel", desc: "Mehrere Farben, Details", multiplier: 1.3 },
    { id: "high", name: "Komplex", desc: "Viele Details, Verläufe", multiplier: 1.7 },
  ],
  backings: [
    { id: "sewn", name: "Zum Aufnähen", price: 0, desc: "Klassische Befestigung mit Naht" },
    { id: "iron", name: "Bügelrückseite", price: 2, desc: "Selbstklebend durch Bügeln" },
    { id: "velcro", name: "Klettverschluss", price: 3, desc: "Abnehmbar und positionsveränderbar" },
    { id: "magnetic", name: "Magnet Rückseite", price: 4.5, desc: "Schnell wechselbar ohne Nähen" },
  ],
  materials: [
    { id: "twill", name: "Twill (Standard)", desc: "Klassisch, robust", price: 0 },
    { id: "felt", name: "Vlies", desc: "Weich, kostengünstig", price: -2 },
    { id: "leather", name: "Leder", desc: "Premium, exklusiv", price: 8 },
    { id: "reflective", name: "Reflektierend", desc: "Sichtbar bei Nacht", price: 5 },
    { id: "denim", name: "Denim", desc: "Robust, casual Look", price: 2 },
    { id: "canvas", name: "Canvas", desc: "Stabil, für Arbeitskleidung", price: 3 },
  ],
  colorRanges: [
    { max: 2, multiplier: 1.0 },
    { max: 4, multiplier: 1.2 },
    { max: 6, multiplier: 1.4 },
    { max: 12, multiplier: 1.8 },
  ],
  edges: [
    { id: "standard", name: "Standard Rand", price: 0, desc: "Sauberer, gerader Schnitt" },
    { id: "merrow", name: "Merrow Rand", price: 1.5, desc: "Dehnbarer, professioneller Überwendlicher Rand" },
    { id: "zigzag", name: "Zickzack Rand", price: 1.0, desc: "Verhindert Ausfransen" },
    { id: "heat_seal", name: "Heat-Seal Rand", price: 2.0, desc: "Versiegelt, wasserfest" },
    { id: "none", name: "Kein Rand", price: -0.5, desc: "Rohr Rand für besonderen Look" },
  ],
  // Express options
  expressMultipliers: {
    none: 1.0,
    express: 1.8, // 80% Aufschlag
    super_express: 2.5, // 150% Aufschlag
  },
  expressDeliveryTimes: {
    none: "7-10 Werktage",
    express: "3-5 Werktage",
    super_express: "24-48 Stunden",
  },
};

export default function PatchCalculator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [selections, setSelections] = useState({
    shape: "circle",
    size: "small",
    complexity: "low",
    backing: "sewn",
    material: "twill",
    colors: 2,
    quantity: 10,
    edge: "standard",
    express: "none",
  });

  const [designFile, setDesignFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [consentPrivacy, setConsentPrivacy] = useState(false);

  const calculatePrice = () => {
    const shapeBase = CONFIG.shapes.find(s => s.id === selections.shape)?.basePrice || 15;
    const sizeMult = CONFIG.sizes.find(s => s.id === selections.size)?.multiplier || 1;
    const compMult = CONFIG.complexity.find(c => c.id === selections.complexity)?.multiplier || 1;
    const backingPrice = CONFIG.backings.find(b => b.id === selections.backing)?.price || 0;
    const materialPrice = CONFIG.materials.find(m => m.id === selections.material)?.price || 0;
    const colorMult = CONFIG.colorRanges.find(r => selections.colors <= r.max)?.multiplier || 1;
    const edgePrice = CONFIG.edges.find(e => e.id === selections.edge)?.price || 0;
    
    const expressKey = selections.express as keyof typeof CONFIG.expressMultipliers;
    const expressMultiplier = CONFIG.expressMultipliers[expressKey] || 1.0;

    const unitPrice = ((shapeBase * sizeMult * compMult * colorMult) + backingPrice + materialPrice + edgePrice);
    
    // Quantity discount
    let discount = 1.0;
    if (selections.quantity >= 100) discount = 0.7;
    else if (selections.quantity >= 50) discount = 0.8;
    else if (selections.quantity >= 20) discount = 0.9;

    return Math.round(unitPrice * selections.quantity * discount * expressMultiplier);
  };

  const getPriceRange = () => {
    const basePrice = calculatePrice();
    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.1);
    return { min: minPrice, max: maxPrice };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send as JSON for compatibility with API
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim() || null,
        patchConfig: selections,
        estimatedPriceMin: priceRange.min,
        estimatedPriceMax: priceRange.max,
        consentPrivacy: consentPrivacy,
        designFile: designFile ? {
          name: designFile.name,
          size: designFile.size,
          type: designFile.type,
        } : null,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Show specific error messages from API
        let errorMessage = result.error || "Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.";
        
        // Show user-friendly messages for common errors
        if (errorMessage.includes("Name and email are required")) {
          errorMessage = "Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.";
        } else if (errorMessage.includes("valid email")) {
          errorMessage = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        } else if (errorMessage.includes("already exists")) {
          errorMessage = "Eine Anfrage mit dieser E-Mail-Adresse existiert bereits. Bitte verwenden Sie eine andere E-Mail oder warten Sie auf unsere Antwort.";
        } else if (errorMessage.includes("Internal server error")) {
          errorMessage = "Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
        }
        
        alert(errorMessage);
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      let errorMessage = "Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.";
      
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
          errorMessage = "Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.";
        } else if (error.name === "AbortError") {
          errorMessage = "Die Anfrage wurde abgebrochen. Bitte versuchen Sie es erneut.";
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const priceRange = getPriceRange();

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6 bg-white rounded-3xl border-2 border-primary/10 shadow-xl max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-primary mb-4">Anfrage erhalten!</h3>
        <p className="text-foreground/70 mb-8">
          Vielen Dank für Ihr Vertrauen. Wir prüfen Ihre Konfiguration und melden uns innerhalb von 24-48 Stunden mit einem finalen Angebot bei Ihnen.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }}>
          Neuen Patch planen
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* --- MAIN STEPS --- */}
      <div className="lg:col-span-2 space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Form wählen</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Wählen Sie die Form Ihres Patches. Individuelle Formen sind gegen Aufpreis möglich.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {CONFIG.shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => { setSelections(prev => ({ ...prev, shape: shape.id })); setStep(2); }}
                    className={cn(
                      "p-4 sm:p-6 rounded-2xl border-2 transition-all text-center group hover:shadow-md",
                      selections.shape === shape.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">{shape.icon}</div>
                    <div className="font-medium text-primary text-sm">{shape.name}</div>
                    <div className="text-xs text-foreground/60 mt-1">{shape.basePrice}€ Basis</div>
                  </button>
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Größe festlegen</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Die Größe beeinflusst den Preis und die Detailtreue Ihres Designs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONFIG.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => { setSelections(prev => ({ ...prev, size: size.id })); setStep(3); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between hover:shadow-md",
                      selections.size === size.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <span className="font-medium text-primary">{size.name}</span>
                    {selections.size === size.id && <Check className="w-5 h-5 text-accent" />}
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(1)} className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Form
              </Button>
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Komplexität</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Mehr Details und Farben erhöhen den Preis. Wir optimieren Ihr Design für beste Ergebnisse.</p>
              <div className="grid grid-cols-1 gap-4">
                {CONFIG.complexity.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => { setSelections(prev => ({ ...prev, complexity: comp.id })); setStep(4); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                      selections.complexity === comp.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-primary">{comp.name}</div>
                        <div className="text-sm text-foreground/60">{comp.desc}</div>
                      </div>
                      {selections.complexity === comp.id && <Check className="w-5 h-5 text-accent" />}
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(2)} className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Größe
              </Button>
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Farbanzahl</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Jede zusätzliche Farbe erhöht die Stickzeit und damit den Preis.</p>
              <div className="p-8 bg-white rounded-3xl border-2 border-primary/10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-accent" />
                    <span className="text-lg font-medium text-primary">Anzahl der Farben</span>
                  </div>
                  <div className="text-4xl font-serif font-bold text-accent">{selections.colors}</div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={selections.colors}
                  onChange={(e) => setSelections(prev => ({ ...prev, colors: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between mt-4 text-sm text-foreground/60">
                  <span>1 Farbe</span>
                  <span>12 Farben</span>
                </div>
                
                {/* Color palette preview */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {Array.from({ length: Math.min(selections.colors, 12) }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/30" style={{
                      backgroundColor: `hsl(${i * 30}, 70%, 50%)`
                    }} />
                  ))}
                  {Array.from({ length: Math.max(0, 12 - selections.colors) }).map((_, i) => (
                    <div key={i + selections.colors} className="w-8 h-8 rounded-full bg-foreground/10 border-2 border-foreground/20" />
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <p className="text-sm text-foreground/70 flex items-center gap-2">
                    <Info className="w-4 h-4 text-accent" />
                    Mehr Farben erhöhen die Stickzeit und damit den Preis. Wir optimieren Ihr Design für die beste Qualität.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep(3)} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                </Button>
                <Button 
                  variant="accent" 
                  onClick={() => setStep(5)} 
                  className="flex-1"
                >
                  Weiter <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Material</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Wählen Sie das Material für Ihre Patches. Jedes Material hat unterschiedliche Eigenschaften.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONFIG.materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => { setSelections(prev => ({ ...prev, material: material.id })); setStep(6); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                      selections.material === material.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-primary text-lg">{material.name}</div>
                        <div className="text-sm text-foreground/60 mt-1">{material.desc}</div>
                        {material.price !== 0 && (
                          <div className="text-xs text-accent mt-2">
                            {material.price > 0 ? '+' : ''}{material.price}€ pro Stück
                          </div>
                        )}
                      </div>
                      {selections.material === material.id && <Check className="w-5 h-5 text-accent" />}
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(4)} className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Farbanzahl
              </Button>
            </motion.div>
          )}

           {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">6</span>
                <h3 className="text-2xl font-serif font-bold text-primary">Randart</h3>
              </div>
              <p className="text-foreground/70 text-sm mb-6">Wählen Sie die Randverarbeitung für Ihren Patch. Der Rand schützt vor Ausfransen und verleiht dem Patch eine professionelle Optik.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONFIG.edges.map((edge) => (
                  <button
                    key={edge.id}
                    onClick={() => { setSelections(prev => ({ ...prev, edge: edge.id })); setStep(7); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                      selections.edge === edge.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-primary text-lg">{edge.name}</div>
                        <div className="text-sm text-foreground/60 mt-1">{edge.desc}</div>
                        {edge.price !== 0 && (
                          <div className="text-xs text-accent mt-2">
                            {edge.price > 0 ? '+' : ''}{edge.price}€ pro Stück
                          </div>
                        )}
                      </div>
                      {selections.edge === edge.id && <Check className="w-5 h-5 text-accent" />}
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(5)} className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zum Material
              </Button>
            </motion.div>
          )}

            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">7</span>
                  <h3 className="text-2xl font-serif font-bold text-primary">Rückseite</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-6">Wählen Sie die Befestigungsart für Ihren Patch.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CONFIG.backings.map((back) => (
                    <button
                      key={back.id}
                      onClick={() => { setSelections(prev => ({ ...prev, backing: back.id })); setStep(8); }}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all text-center hover:shadow-md",
                        selections.backing === back.id ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                      )}
                    >
                      <div className="font-medium text-primary">{back.name}</div>
                      <div className="text-xs text-foreground/60 mt-1">{back.desc}</div>
                      {back.price > 0 && (
                        <div className="text-xs text-accent mt-2">+{back.price}€ pro Stück</div>
                      )}
                      {selections.backing === back.id && <Check className="w-5 h-5 text-accent mx-auto mt-2" />}
                    </button>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => setStep(6)} className="mt-4">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zum Rand
                </Button>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">8</span>
                  <h3 className="text-2xl font-serif font-bold text-primary">Menge</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-6">Staffelpreise gelten ab 20, 50 und 100 Stück.</p>
                <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl border-2 border-primary/10 shadow-sm">
                  <div className="text-6xl font-serif font-bold text-primary">{selections.quantity}</div>
                  <div className="text-sm text-foreground/60">Stück</div>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setSelections(prev => ({ ...prev, quantity: Math.max(10, prev.quantity - 10) }))}
                      className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary/5 transition-colors text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={selections.quantity <= 10}
                    >
                      -
                    </button>
                    <button 
                      onClick={() => setSelections(prev => ({ ...prev, quantity: prev.quantity + 10 }))}
                      className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary/5 transition-colors text-2xl"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-foreground/60">Mindestbestellmenge: 10 Stück</p>
                </div>
                
                {/* Quantity discounts */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { threshold: 20, discount: "10%" },
                    { threshold: 50, discount: "20%" },
                    { threshold: 100, discount: "30%" },
                  ].map((tier, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center text-sm",
                        selections.quantity >= tier.threshold 
                          ? "border-accent bg-accent/5" 
                          : "border-primary/10"
                      )}
                    >
                      <div className="font-bold text-primary">ab {tier.threshold}+ Stück</div>
                      <div className="text-accent font-bold">- {tier.discount} Rabatt</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(7)} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button 
                    variant="accent" 
                    onClick={() => setStep(9)} 
                    className="flex-1"
                  >
                    Weiter <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">9</span>
                  <h3 className="text-2xl font-serif font-bold text-primary">Express-Option</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-6">Benötigen Sie Ihre Patches besonders schnell? Wählen Sie unsere Express-Optionen.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(CONFIG.expressMultipliers).map(([key, multiplier]) => {
                    const expressKey = key as keyof typeof CONFIG.expressMultipliers;
                    return (
                      <button
                        key={key}
                        onClick={() => { 
                          setSelections(prev => ({ ...prev, express: expressKey })); 
                          setStep(10);
                        }}
                        className={cn(
                          "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                          selections.express === expressKey ? "border-accent bg-accent/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-primary text-lg">
                              {expressKey === "none" ? "Standard" : expressKey === "express" ? "Express" : "Super Express"}
                            </div>
                            <div className="text-sm text-foreground/60 mt-1">
                              Lieferzeit: {CONFIG.expressDeliveryTimes[expressKey]}
                            </div>
                            {multiplier > 1 && (
                              <div className="text-xs text-accent mt-2">
                                +{(multiplier - 1) * 100}% Aufschlag
                              </div>
                            )}
                          </div>
                          {selections.express === expressKey && <Check className="w-5 h-5 text-accent" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <Button variant="ghost" onClick={() => setStep(8)} className="mt-4">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Menge
                </Button>
              </motion.div>
            )}

             {step === 10 && (
              <motion.div
                key="step10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">10</span>
                  <h3 className="text-2xl font-serif font-bold text-primary">Design hochladen (Optional)</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-6">Laden Sie Ihr Design hoch, um eine genauere Preiskalkulation zu erhalten.</p>
                <div className="p-8 bg-white rounded-3xl border-2 border-primary/10 border-dashed shadow-sm">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-primary mb-2">Ihr Design hier ablegen</h4>
                    <p className="text-sm text-foreground/60 mb-6">PNG, JPG, SVG oder PDF (max. 10MB)</p>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-xl hover:bg-primary/90 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Datei auswählen</span>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {designFile && (
                      <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Layers className="w-5 h-5 text-accent" />
                          <div>
                            <div className="font-medium text-primary">{designFile.name}</div>
                            <div className="text-xs text-foreground/60">{(designFile.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDesignFile(null)}
                          className="text-sm text-primary hover:text-accent"
                        >
                          Entfernen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(9)} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button 
                    variant="accent" 
                    onClick={() => setStep(11)} 
                    className="flex-1"
                  >
                    Zu den Kontaktdaten <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 11 && (
              <motion.div
                key="step11"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">11</span>
                  <h3 className="text-2xl font-serif font-bold text-primary">Kontaktdaten</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-6">Geben Sie Ihre Kontaktdaten an, damit wir Sie für die Offerterstellung erreichen können.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                        <User className="w-4 h-4" /> Name*
                      </label>
                      <Input
                        required
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                        placeholder="Ihr voller Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                        <Mail className="w-4 h-4" /> E-Mail*
                      </label>
                      <Input
                        required
                        type="email"
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                        placeholder="email@beispiel.de"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                      <Phone className="w-4 h-4" /> Telefon (Optional)
                    </label>
                    <Input
                      className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      placeholder="+49 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                      <MessageSquare className="w-4 h-4" /> Nachricht / Wünsche
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      placeholder="Haben Sie besondere Wünsche an das Design oder die Umsetzung?"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <input
                      type="checkbox"
                      id="consent-privacy-calc"
                      checked={consentPrivacy}
                      onChange={(e) => setConsentPrivacy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-primary/30 text-accent focus:ring-accent"
                    />
                    <label htmlFor="consent-privacy-calc" className="text-sm text-foreground/70">
                      Ich stimme der Datenschutzerklärung zu. Meine Daten werden ausschließlich für die Angebotserstellung verwendet.
                    </label>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button variant="ghost" onClick={() => setStep(10)} className="flex-1">
                      <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                    </Button>
                    <Button 
                      variant="accent" 
                      type="submit" 
                      disabled={loading || !consentPrivacy} 
                      className="flex-1"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      Anfrage jetzt senden
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* --- SUMMARY SIDEBAR --- */}
      <div className="lg:sticky lg:top-24">
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-primary text-background py-4">
            <CardTitle className="text-center text-background text-xl">Ihre Konfiguration</CardTitle>
          </CardHeader>
           <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Form:</span>
                <span className="font-bold text-primary">{CONFIG.shapes.find(s => s.id === selections.shape)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Größe:</span>
                <span className="font-bold text-primary">{CONFIG.sizes.find(s => s.id === selections.size)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Komplexität:</span>
                <span className="font-bold text-primary">{CONFIG.complexity.find(c => c.id === selections.complexity)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Farben:</span>
                <span className="font-bold text-primary">{selections.colors}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Material:</span>
                <span className="font-bold text-primary">{CONFIG.materials.find(m => m.id === selections.material)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Rand:</span>
                <span className="font-bold text-primary">{CONFIG.edges.find(e => e.id === selections.edge)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Rückseite:</span>
                <span className="font-bold text-primary">{CONFIG.backings.find(b => b.id === selections.backing)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Express:</span>
                <span className="font-bold text-primary">
                  {selections.express === "none" ? "Standard" : selections.express === "express" ? "Express" : "Super Express"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Menge:</span>
                <span className="font-bold text-primary">{selections.quantity} Stück</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Lieferzeit:</span>
                <span className="font-bold text-primary">{CONFIG.expressDeliveryTimes[selections.express as keyof typeof CONFIG.expressDeliveryTimes]}</span>
              </div>
              <div className="h-px bg-primary/10 my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-primary">Gesamtpreis:</span>
                <span className="text-2xl font-serif font-black text-accent">{calculatePrice()} €</span>
              </div>
              
              <div className="flex justify-between text-xs text-foreground/60">
                <span>ca. {priceRange.min} - {priceRange.max} €</span>
              </div>
            </div>
            
              <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
                <div className="flex gap-3 items-start">
                  <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Dies ist eine unverbindliche Kostenschätzung. Der finale Preis wird nach Prüfung Ihres Motivs festgelegt.
                  </p>
                </div>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
