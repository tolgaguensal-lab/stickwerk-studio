import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Info, Send, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// --- Config & Logic ---
const CONFIG = {
  shapes: [
    { id: "circle", name: "Rund", icon: "◯", basePrice: 15 },
    { id: "rectangle", name: "Rechteckig", icon: "▭", basePrice: 15 },
    { id: "shield", name: "Schildform", icon: "🛡️", basePrice: 20 },
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
    { id: "sewn", name: "Zum Aufnähen", price: 0 },
    { id: "iron", name: "Bügelrückseite", price: 2 },
    { id: "velcro", name: "Klettverschluss", price: 3 },
  ],
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
    quantity: 10,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const calculatePrice = () => {
    const shapeBase = CONFIG.shapes.find(s => s.id === selections.shape)?.basePrice || 15;
    const sizeMult = CONFIG.sizes.find(s => s.id === selections.size)?.multiplier || 1;
    const compMult = CONFIG.complexity.find(c => c.id === selections.complexity)?.multiplier || 1;
    const backingPrice = CONFIG.backings.find(b => b.id === selections.backing)?.price || 0;

    const unitPrice = (shapeBase * sizeMult * compMult) + backingPrice;
    
    // Quantity discount
    let discount = 1.0;
    if (selections.quantity >= 100) discount = 0.7;
    else if (selections.quantity >= 50) discount = 0.8;
    else if (selections.quantity >= 20) discount = 0.9;

    return Math.round(unitPrice * selections.quantity * discount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculationData: selections,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.");
      }
    } catch (error) {
      alert("Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CONFIG.shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => { setSelections(prev => ({ ...prev, shape: shape.id })); setStep(2); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all text-center group",
                      selections.shape === shape.id ? "border-accent bg-accent/5" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{shape.icon}</div>
                    <div className="font-medium text-primary">{shape.name}</div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONFIG.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => { setSelections(prev => ({ ...prev, size: size.id })); setStep(3); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between",
                      selections.size === size.id ? "border-accent bg-accent/5" : "border-primary/10 hover:border-primary/30"
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
              <div className="grid grid-cols-1 gap-4">
                {CONFIG.complexity.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => { setSelections(prev => ({ ...prev, complexity: comp.id })); setStep(4); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all",
                      selections.complexity === comp.id ? "border-accent bg-accent/5" : "border-primary/10 hover:border-primary/30"
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
                <h3 className="text-2xl font-serif font-bold text-primary">Rückseite</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CONFIG.backings.map((back) => (
                  <button
                    key={back.id}
                    onClick={() => { setSelections(prev => ({ ...prev, backing: back.id })); setStep(5); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all text-center",
                      selections.backing === back.id ? "border-accent bg-accent/5" : "border-primary/10 hover:border-primary/30"
                    )}
                  >
                    <div className="font-medium text-primary">{back.name}</div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(3)} className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Komplexität
              </Button>
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
                <h3 className="text-2xl font-serif font-bold text-primary">Menge</h3>
              </div>
              <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl border-2 border-primary/10">
                <div className="text-6xl font-serif font-bold text-primary">{selections.quantity}</div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setSelections(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 10) }))}
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary/5 transition-colors text-2xl"
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
                <p className="text-sm text-foreground/60">Staffelpreise gelten ab 20, 50 und 100 Stück.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep(4)} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                </Button>
                <Button 
                  variant="accent" 
                  onClick={() => setStep(6)} 
                  className="flex-1"
                >
                  Anfrage abschließen <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
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
                <h3 className="text-2xl font-serif font-bold text-primary">Kontaktdaten</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                      <User className="w-4 h-4" /> Name
                    </label>
                    <input
                      required
                      className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      placeholder="Ihr voller Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/70">
                      <Mail className="w-4 h-4" /> E-Mail
                    </label>
                    <input
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
                  <input
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
                <div className="flex gap-4 pt-4">
                  <Button variant="ghost" onClick={() => setStep(5)} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button 
                    variant="accent" 
                    type="submit" 
                    disabled={loading} 
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
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
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
                <span className="text-foreground/60">Rückseite:</span>
                <span className="font-bold text-primary">{CONFIG.backings.find(b => b.id === selections.backing)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Menge:</span>
                <span className="font-bold text-primary">{selections.quantity} Stück</span>
              </div>
              <div className="h-px bg-primary/10 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-primary">Gesamtpreis:</span>
                <span className="text-2xl font-serif font-black text-accent">{calculatePrice()} €</span>
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
