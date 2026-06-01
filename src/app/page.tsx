"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback } from "react";
import Image from "next/image";
import { ArrowRight, PenTool, Zap, Heart, ShieldCheck, Users, TrendingUp, Clock, Star, CheckCircle2, Target, Award, FileText, Truck, Sparkles, Bolt, Mail, Receipt } from "lucide-react";
import PatchCalculator from "@/components/PatchCalculator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const processSteps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Anfrage",
      description: "Füllen Sie unseren Patch-Konfigurator aus oder senden Sie uns Ihr Design per E-Mail.",
      step: "01"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Designprüfung",
      description: "Wir analysieren Ihr Motiv auf Stickbarkeit und optimieren es für beste Ergebnisse.",
      step: "02"
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "Individuelles Angebot",
      description: "Sie erhalten von uns ein detailliertes Angebot mit Preis, Lieferzeit und Materialempfehlungen.",
      step: "03"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Produktion",
      description: "Ihre Patches werden mit industriellen Stickmaschinen in hoher Qualität gefertigt.",
      step: "04"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Versand",
      description: "Schneller Versand mit DHL oder Express. Tracken Sie Ihre Sendung in Echtzeit.",
      step: "05"
    }
  ];

  const targetAudiences = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Privatkunden",
      description: "Einzelstücke, Geschenke oder persönliche Accessoires für besondere Anlässe.",
      tagline: "Einzigartigkeit für Sie"
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Vereine & Clubs",
      description: "Team-Patches, Vereins-Logos und Mitglieder-Accessoires für gemeinsame Identität.",
      tagline: "Zusammen. Stark. Sichtbar."
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Creator & Merch",
      description: "Branded Patches für Ihre Merch-Kollektion. Perfekt für YouTuber, Streamer und Influencer.",
      tagline: "Ihre Marke. Ihr Style."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Unternehmen",
      description: "Firmen-Logos, Arbeitskleidung und Werbeartikel für professionellen Auftritt.",
      tagline: "Business mit Stil"
    }
  ];

  const trustElements = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Deutsche Handwerksqualität",
      description: "Alle Patches werden in Deutschland gefertigt mit höchste Präzision."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "98% Kundenzufriedenheit",
      description: "Über 500 zufriedene Kunden seit 2020. Bewertet mit 4.9/5 Sternen."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Schnelle Lieferzeit",
      description: "Standardproduktion in 7-10 Werktagen. Express in nur 3-5 Tagen."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Öko-Tex zertifiziert",
      description: "Alle Materialien sind schadstoffgeprüft und hautfreundlich."
    }
  ];

  const services = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Digitale Präzision",
      description: "Wir optimieren jedes Motiv für die Stickmaschine, damit jede Linie perfekt sitzt."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Haptische Qualität",
      description: "Nur erstklassige Garne und langlebige Materialien. Qualität, die man fühlt."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Persönlicher Dialog",
      description: "Individuelle Beratung zu Form und Material für Ihr perfektes Ergebnis."
    },
    {
      icon: <Bolt className="w-8 h-8" />,
      title: "Express-Service",
      description: "Schnelle Produktion für dringende Aufträge ohne Qualitätsverlust."
    }
   ];

  return (
    <main className="relative z-10">
       {/* Hero Section */}
       <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-8 md:pt-16 pb-16 bg-gradient-to-b from-canvas-white via-canvas-white to-paper-gray">
         <motion.div 
           style={{ opacity, scale }}
           className="max-w-4xl space-y-8"
         >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative inline-block mb-6"
            >
              <div className="relative z-10 p-4 bg-card rounded-2xl border border-border shadow-sm">
                <Image 
                  src="/brand/logo-mark.svg" 
                  alt="Stickwerk-Studio Logo" 
                  width={120} 
                  height={120} 
                  className="rounded-xl"
                  priority
                />
              </div>
            </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight tracking-tight"
           >
             Präzision, die <br /> 
             <span className="text-accent">sichtbar bleibt</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
           >
             Maschinenstickerei & Custom Patches für Marken, die Wert auf Details legen.
           </motion.p>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-wrap justify-center gap-4"
           >
              <Button 
                size="lg" 
                variant="default"
                className="px-8 py-5 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 group"
                onClick={() => scrollToSection("calculator")}
              >
                Jetzt konfigurieren 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-5 text-base border-accent/40 text-foreground hover:bg-accent/5 group"
                onClick={() => scrollToSection("cta")}
              >
                Kostenlose Beratung
              </Button>
           </motion.div>
         </motion.div>
       </section>

       {/* Services Section */}
       <section id="features" className="py-16 md:py-24 px-6 bg-background">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">Das Stickwerk-Versprechen</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Warum Kunden uns vertrauen – seit über 5 Jahren.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {services.map((service, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ y: -4 }}
                 className="card p-8 group"
               >
                 <div className="w-16 h-16 rounded-2xl bg-surface-muted text-foreground flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {service.icon}
                 </div>
                 <h3 className="text-xl font-serif text-foreground mb-3">{service.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{service.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>

       {/* Target Audiences Section */}
       <section id="zielgruppen" className="py-16 md:py-24 px-6 bg-surface-muted">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight">Für wen wir sticken</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Egal ob Einzelstück oder Serienproduktion – wir finden die perfekte Lösung.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {targetAudiences.map((audience, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ y: -4 }}
                 className="card p-8 group relative"
               >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 to-accent/20" />
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    {audience.icon}
                 </div>
                 <h3 className="text-xl font-serif text-foreground mb-2">{audience.title}</h3>
                 <p className="text-sm font-medium text-accent mb-3">{audience.tagline}</p>
                 <p className="text-muted-foreground leading-relaxed">{audience.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>

       {/* Process Section - Step Cards */}
       <section id="prozess" className="py-16 md:py-24 px-6 bg-background">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Unser Prozess</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Von der ersten Idee bis zum fertigen Patch – transparent und unkompliziert.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="card p-6 text-center relative group"
                >
                  {/* Combined step indicator with icon */}
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground text-[11px] font-medium flex items-center justify-center shadow-sm">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-serif mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  {/* Connector arrow */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 -right-3 text-accent/30 text-xl font-light">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
           </div>
         </div>
       </section>
 
       {/* Calculator Section */}
       <section id="calculator" className="py-16 md:py-24 px-6 bg-surface-muted">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Ihr Patch-Konfigurator</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Gestalten Sie Ihren Patch in Echtzeit und erhalten Sie eine sofortige Kostenschätzung.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative"
           >
             <PatchCalculator />
           </motion.div>
         </div>
       </section>
 
       {/* Trust Elements */}
       <section id="vertrauen" className="py-16 md:py-24 px-6 bg-background">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Warum uns vertrauen?</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Qualität, die überzeugt. Service, der begeistert.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {trustElements.map((element, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ y: -4 }}
                 className="card p-8 text-center"
               >
                 <div className="w-16 h-16 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                   {element.icon}
                 </div>
                 <h3 className="text-xl font-serif text-foreground mb-3">{element.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{element.description}</p>
               </motion.div>
             ))}
           </div>
 
            {/* Trust Facts */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  metric: "500+",
                  label: "Kunden seit 2020",
                  description: "Von Einzelstücken bis Serienproduktion — unsere Kunden vertrauen auf unsere Qualität."
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  metric: "7-10",
                  label: "Werktage Standard",
                  description: "Express in 3-5 Tagen möglich. Transparente Lieferzeiten von Anfang an."
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  metric: "15",
                  label: "€ Musterpreis",
                  description: "Anrechenbar auf erste Bestellung. Testen Sie unsere Qualität vor dem großen Auftrag."
                }
              ].map((fact, i) => (
                <Card key={i} className="card border border-border">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                      {fact.icon}
                    </div>
                    <div className="text-3xl font-serif text-foreground mb-1">{fact.metric}</div>
                    <div className="text-sm font-medium text-accent mb-3">{fact.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
         </div>
       </section>
 
       {/* FAQ Section */}
       <section id="faq" className="py-16 md:py-24 px-6 bg-background">
         <div className="max-w-3xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 space-y-4"
           >
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">Häufige Fragen</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Alles, was Sie über unsere Patches wissen müssen.
             </p>
             <div className="w-20 h-0.5 bg-accent mx-auto rounded-full" />
           </motion.div>
 
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <Accordion type="single" collapsible className="space-y-3">
               {[
                 { id: "time", question: "Wie lange dauert die Produktion?", answer: "Die Standardproduktionszeit beträgt 7-10 Werktage nach Freigabe des Stickmotivs. Bei größeren Mengen (ab 100 Stück) planen wir 14-21 Tage ein. Expressproduktion ist auf Anfrage in 3-5 Werktagen möglich." },
                 { id: "formats", question: "Welche Dateiformate akzeptiert ihr für Designs?", answer: "Wir akzeptieren PNG, JPG, SVG, PDF und AI. Am besten funktionieren vektorbasierte Formate (SVG, AI) für eine optimale Qualität. Bei Rastergrafiken sollte die Auflösung mindestens 300 DPI betragen." },
                 { id: "min-quantity", question: "Gibt es Mindestabnahmemengen?", answer: "Die Mindestabnahmemenge beträgt 10 Stück. Für individuelle Formen oder besondere Materialien kann die Mindestmenge 25 Stück betragen. Ab 20, 50 und 100 Stück gelten attraktive Staffelpreise." },
                 { id: "over-stitch", question: "Können ihr auch bestehende Patches übersticken?", answer: "Ja, wir bieten auch Überstickungen auf bestehenden Patches oder Textilien an. Dies ist ideal für Personalisierungen oder Updates von Logos. Bitte senden Sie uns eine Anfrage mit Details zu Material und gewünschtem Design." },
                 { id: "care", question: "Wie pflege ich meine Stickpatches richtig?", answer: "Patches zum Aufnähen können bei bis zu 40°C gewaschen werden. Bügelrückseiten sollten nicht gebügelt und schonend gewaschen werden. Klettverschlüsse behalten ihre Haftung bei normaler Pflege. Zum Trocknen immer flach legen, nicht in den Trockner geben." },
                 { id: "digitalization", question: "Bietet ihr auch Digitalisierung von Logos an?", answer: "Ja, wir digitalisieren Ihre Logos oder Designs für die Stickmaschine. Die Kosten betragen einmalig 15-30€ je nach Komplexität. Diese Gebühr entfällt bei Bestellungen ab 50 Stück." },
                 { id: "samples", question: "Kann ich vor der Bestellung ein Muster erhalten?", answer: "Ja, wir bieten Muster-Patches an. Die Kosten betragen 15€ pro Stück (anrechenbar auf spätere Bestellungen). Die Musterproduktion dauert 5-7 Werktage." },
                 { id: "payment", question: "Welche Zahlungsmethoden akzeptiert ihr?", answer: "Wir akzeptieren Vorkasse (Banküberweisung), PayPal und Rechnung für Geschäftskunden. Bei Erstbestellungen bitten wir um Vorkasse. Ab der zweiten Bestellung können wir auch Rechnung anbieten." }
               ].map((item, i) => (
                 <AccordionItem key={item.id} value={`item-${i}`} className="rounded-xl border border-border bg-card overflow-hidden">
                   <AccordionTrigger className="text-base font-medium text-foreground hover:text-accent transition-colors px-6 py-4">
                     {item.question}
                   </AccordionTrigger>
                   <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4">
                     {item.answer}
                   </AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           </motion.div>
         </div>
       </section>
 
        {/* Final CTA */}
        <section id="cta" className="py-16 md:py-24 px-6 bg-surface-muted">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl bg-gradient-to-br from-foreground via-[#1c1a17] to-foreground p-12 md:p-20 text-center text-card overflow-hidden"
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative z-10 space-y-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight"
                >
                  Bereit für Ihre 
                  <span className="block text-accent">perfekten Patches?</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg md:text-xl text-card/80 max-w-2xl mx-auto leading-relaxed"
                >
                  Starten Sie noch heute! Wir beraten Sie gerne persönlich oder Sie nutzen unseren Konfigurator.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button 
                    size="lg" 
                    variant="default"
                    className="px-8 py-5 text-base bg-card text-foreground hover:bg-card/90 shadow-lg shadow-black/20 group"
                    onClick={() => scrollToSection("calculator")}
                  >
                    Jetzt konfigurieren 
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="default"
                    className="px-8 py-5 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 group"
                    onClick={() => window.location.href = "mailto:info@stickwerk-studio.de"}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Anfrage per E-Mail
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
 
       {/* Footer */}
       <footer className="bg-foreground text-card py-16 md:py-20 px-6">
         <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Image src="/brand/logo-mark.svg" alt="Stickwerk-Studio Logo" width={40} height={40} />
                  <span className="text-xl font-serif">Stickwerk-Studio</span>
                </div>
               <p className="text-card/70 leading-relaxed">
                 Professionelle Maschinenstickerei für Patches, Logos und Textilbranding in Premium-Handwerksqualität. Hergestellt in Deutschland.
               </p>
             </div>
             <div className="space-y-5">
               <h4 className="font-bold text-lg">Navigation</h4>
               <div className="space-y-3">
                 <a href="#features" className="block text-card/70 hover:text-accent transition-colors nav-link">Leistungen</a>
                 <a href="#zielgruppen" className="block text-card/70 hover:text-accent transition-colors nav-link">Zielgruppen</a>
                 <a href="#prozess" className="block text-card/70 hover:text-accent transition-colors nav-link">Prozess</a>
                 <a href="#calculator" className="block text-card/70 hover:text-accent transition-colors nav-link">Konfigurator</a>
                 <a href="#faq" className="block text-card/70 hover:text-accent transition-colors nav-link">FAQ</a>
               </div>
             </div>
             <div className="space-y-5">
               <h4 className="font-bold text-lg">Kontakt</h4>
               <div className="space-y-3 text-card/70">
                 <p>info@stickwerk-studio.de</p>
                 <p>+49 (0) 123 456789</p>
                 <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
               </div>
             </div>
             <div className="space-y-5">
               <h4 className="font-bold text-lg">Rechtliches</h4>
               <div className="space-y-3 text-card/70">
                 <a href="/impressum" className="block hover:text-accent transition-colors nav-link">Impressum</a>
                 <a href="/datenschutz" className="block hover:text-accent transition-colors nav-link">Datenschutz</a>
                 <a href="/agb" className="block hover:text-accent transition-colors nav-link">AGB</a>
               </div>
                <div className="flex gap-3 pt-2">
                  <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-card/70 hover:bg-card/20 hover:text-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                  </a>
                </div>
             </div>
           </div>
           <div className="pt-8 border-t border-card/20 text-center text-sm text-card/60">
             <p>© 2026 Stickwerk-Studio. Alle Rechte vorbehalten. | DSGVO konform | Made in Germany</p>
           </div>
         </div>
       </footer>
     </main>
   );
}
