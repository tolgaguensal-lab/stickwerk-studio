"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback } from "react";
import Image from "next/image";
import { ArrowRight, PenTool, Zap, Heart, ShieldCheck, Users, TrendingUp, Clock, Star, CheckCircle2, Target, Award, FileText, Truck, Smile, Sparkles, Bolt, Mail } from "lucide-react";
import PatchCalculator from "@/components/PatchCalculator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      icon: <div className="w-8 h-8 flex items-center justify-center text-2xl">€</div>,
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
      icon: <Users className="w-8 h-8" />,
      title: "Privatkunden",
      description: "Einzelstücke, Geschenke oder persönliche Accessoires für besondere Anlässe.",
      tagline: "Einzigartigkeit für Sie"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Vereine & Clubs",
      description: "Team-Patches, Vereins-Logos und Mitglieder-Accessoires für gemeinsame Identität.",
      tagline: "Zusammen. Stark. Sichtbar."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Creator & Merch",
      description: "Branded Patches für Ihre Merch-Kollektion. Perfekt für YouTuber, Streamer und Influencer.",
      tagline: "Ihre Marke. Ihr Style."
    },
    {
      icon: <Target className="w-8 h-8" />,
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
      icon: <PenTool className="w-6 h-6" />,
      title: "Digitale Präzision",
      description: "Wir optimieren jedes Motiv für die Stickmaschine, damit jede Linie perfekt sitzt."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Haptische Qualität",
      description: "Nur erstklassige Garne und langlebige Materialien. Qualität, die man fühlt."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Persönlicher Dialog",
      description: "Individuelle Beratung zu Form und Material für Ihr perfektes Ergebnis."
    },
    {
      icon: <Bolt className="w-6 h-6" />,
      title: "Express-Service",
      description: "Schnelle Produktion für dringende Aufträge ohne Qualitätsverlust."
    }
   ];

  return (
    <main className="relative z-10">
       {/* Hero Section - NEUES DESIGNSYSTEM */}
       <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-machinery-silver to-soft-white">
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
             <div className="absolute inset-0 bg-gradient-to-r from-craft-gold/20 to-precision-blue/20 rounded-full blur-3xl animate-pulse" />
             <div className="relative z-10 p-3 bg-soft-white rounded-xl shadow-lg border-2 border-soft-white">
               <Image 
                 src="/logo.jpg" 
                 alt="Stickwerk-Studio Logo" 
                 width={180} 
                 height={180} 
                 className="rounded-xl object-cover"
               />
             </div>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-7xl font-serif font-bold text-industry-gray leading-tight"
           >
             Präzision, die <br /> 
             <span className="text-craft-gold">sichtbar bleibt</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-xl md:text-2xl text-industry-gray/70 max-w-2xl mx-auto leading-relaxed font-medium"
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
               variant="gold"
               className="px-8 py-4 text-lg group"
               onClick={() => scrollToSection("calculator")}
             >
               Jetzt konfigurieren 
               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
             <Button 
               size="lg" 
               variant="outline"
               className="px-8 py-4 text-lg group"
               onClick={() => scrollToSection("cta")}
             >
               Kostenlose Beratung
             </Button>
           </motion.div>
         </motion.div>
 
         {/* Scroll indicator */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 1 }}
           className="absolute bottom-10 animate-bounce"
         >
           <div className="w-6 h-10 border-2 border-precision-blue/30 rounded-full flex justify-center">
             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="w-1 h-3 bg-precision-blue rounded-full mt-2"
             />
           </div>
         </motion.div>
       </section>

       {/* Services Section - NEUES DESIGNSYSTEM */}
       <section id="features" className="py-20 px-6">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Das Stickwerk-Versprechen</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Warum Kunden uns vertrauen – seit über 5 Jahren.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {services.map((service, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.15 }}
                 whileHover={{ y: -5, scale: 1.02 }}
                 className="card p-6 group"
               >
                 <div className="w-14 h-14 rounded-lg bg-precision-blue/10 text-precision-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {service.icon}
                 </div>
                 <h3 className="text-xl font-serif font-bold text-industry-gray mb-3">{service.title}</h3>
                 <p className="text-industry-gray/70 leading-relaxed">{service.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>

       {/* Target Audiences Section - NEUES DESIGNSYSTEM */}
       <section id="zielgruppen" className="py-20 px-6 bg-soft-white">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Für wen wir sticken</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Egal ob Einzelstück oder Serienproduktion – wir finden die perfekte Lösung.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {targetAudiences.map((audience, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.15 }}
                 whileHover={{ y: -5 }}
                 className="card p-6 group overflow-hidden"
               >
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-craft-gold to-precision-blue opacity-20" />
                 <div className="w-14 h-14 rounded-lg bg-craft-gold/10 text-craft-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {audience.icon}
                 </div>
                 <h3 className="text-xl font-serif font-bold text-industry-gray mb-2">{audience.title}</h3>
                 <p className="text-sm font-medium text-craft-gold mb-3">{audience.tagline}</p>
                 <p className="text-industry-gray/70 leading-relaxed text-sm">{audience.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>

       {/* Process Section - NEUES DESIGNSYSTEM */}
       <section id="prozess" className="section">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Unser Prozess</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Von der ersten Idee bis zum fertigen Patch – transparent und unkompliziert.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
 
           <div className="relative">
             {/* Timeline line */}
             <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-precision-blue/20 via-craft-gold/20 to-precision-blue/20 hidden lg:block" />
             
             <div className="space-y-12">
               {processSteps.map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: i * 0.2 }}
                   className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                 >
                   {/* Step number */}
                   <div className="lg:col-span-1 flex justify-center lg:justify-start">
                     <div className="w-16 h-16 rounded-xl bg-precision-blue text-soft-white flex items-center justify-center font-bold font-serif text-xl shadow-lg relative z-10">
                       {step.step}
                     </div>
                   </div>
                   
                   {/* Icon */}
                   <div className="lg:col-span-1 flex justify-center">
                     <div className="w-14 h-14 rounded-xl bg-craft-gold/10 text-precision-blue flex items-center justify-center">
                       {step.icon}
                     </div>
                   </div>
                   
                   {/* Content */}
                   <div className="lg:col-span-8">
                     <Card className="border-0 shadow-md">
                       <CardHeader className="pb-4">
                         <CardTitle className="text-2xl font-serif font-bold text-industry-gray">{step.title}</CardTitle>
                       </CardHeader>
                       <CardContent>
                         <p className="text-industry-gray/70 leading-relaxed">{step.description}</p>
                       </CardContent>
                     </Card>
                   </div>
                   
                   {/* Connector */}
                   {i < processSteps.length - 1 && (
                     <div className="absolute left-8 top-20 lg:top-8 w-1 h-16 bg-gradient-to-b from-precision-blue/20 to-craft-gold/20 hidden lg:block" />
                   )}
                 </motion.div>
               ))}
             </div>
           </div>
         </div>
       </section>
 
       {/* Calculator Section - NEUES DESIGNSYSTEM */}
       <section id="calculator" className="section bg-soft-white">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Ihr Patch-Konfigurator</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Gestalten Sie Ihren Patch in Echtzeit und erhalten Sie eine sofortige Kostenschätzung.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
           >
             <PatchCalculator />
           </motion.div>
         </div>
       </section>
 
       {/* Trust Elements - NEUES DESIGNSYSTEM */}
       <section id="vertrauen" className="section">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Warum uns vertrauen?</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Qualität, die überzeugt. Service, der begeistert.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {trustElements.map((element, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.15 }}
                 whileHover={{ y: -5, scale: 1.02 }}
                 className="card text-center"
               >
                 <div className="w-16 h-16 rounded-xl bg-craft-gold/10 text-craft-gold flex items-center justify-center mx-auto mb-6">
                   {element.icon}
                 </div>
                 <h3 className="text-xl font-serif font-bold text-industry-gray mb-3">{element.title}</h3>
                 <p className="text-industry-gray/70 leading-relaxed text-sm">{element.description}</p>
               </motion.div>
             ))}
           </div>
 
           {/* Testimonials */}
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           >
             {[
               {
                 name: "Max Mustermann",
                 company: "Startup Berlin",
                 quote: "Unglaubliche Qualität und super Service! Unsere Team-Patches sind genau so geworden, wie wir es uns vorgestellt haben.",
                 stars: 5
               },
               {
                 name: "Anna Schmidt",
                 company: "FC Böhörde",
                 quote: "Schnelle Lieferung und die Patches halten was sie versprechen. Die Spieler lieben sie!",
                 stars: 5
               },
               {
                 name: "Thomas Bauer",
                 company: "Bauer GmbH",
                 quote: "Professionelle Beratung und beste Verarbeitung. Sehr zu empfehlen für Firmenkleidung.",
                 stars: 4
               }
             ].map((testimonial, i) => (
               <Card key={i} className="card">
                 <CardContent className="p-6">
                   <div className="flex items-center mb-4">
                     {[...Array(testimonial.stars)].map((_, j) => (
                       <Star key={j} className="w-5 h-5 text-craft-gold fill-craft-gold" />
                     ))}
                     {[...Array(5 - testimonial.stars)].map((_, j) => (
                       <Star key={j + testimonial.stars} className="w-5 h-5 text-industry-gray/30" />
                     ))}
                   </div>
                    <p className="text-industry-gray/70 italic mb-6 leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-precision-blue/10 flex items-center justify-center">
                       <span className="text-precision-blue font-bold">{testimonial.name.charAt(0)}</span>
                     </div>
                     <div>
                       <div className="font-semibold text-industry-gray">{testimonial.name}</div>
                       <div className="text-sm text-industry-gray/60">{testimonial.company}</div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </motion.div>
         </div>
       </section>
 
       {/* FAQ Section - NEUES DESIGNSYSTEM */}
       <section id="faq" className="section bg-soft-white">
         <div className="max-w-4xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-20 space-y-4"
           >
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-industry-gray">Häufige Fragen</h2>
             <p className="text-xl text-industry-gray/70 max-w-2xl mx-auto">
               Alles, was Sie über unsere Patches wissen müssen.
             </p>
             <div className="w-24 h-1 bg-craft-gold mx-auto rounded-full" />
           </motion.div>
 
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <Accordion type="single" collapsible className="space-y-4">
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
                 <AccordionItem key={item.id} value={`item-${i}`} className="rounded-xl border-0 bg-soft-white shadow-sm">
                   <AccordionTrigger className="text-lg font-semibold text-industry-gray hover:text-craft-gold transition-colors px-6 py-4">
                     {item.question}
                   </AccordionTrigger>
                   <AccordionContent className="text-industry-gray/70 leading-relaxed px-6 pb-4">
                     {item.answer}
                   </AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           </motion.div>
         </div>
       </section>
 
       {/* Final CTA - NEUES DESIGNSYSTEM */}
       <section id="cta" className="section">
         <div className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative rounded-xl bg-gradient-to-r from-precision-blue to-precision-blue/80 p-12 md:p-20 text-center text-soft-white overflow-hidden"
           >
             <div className="relative z-10 space-y-8">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="text-4xl md:text-5xl font-serif font-bold text-craft-gold"
               >
                 Bereit für Ihre 
                 <span className="block">perfekten Patches?</span>
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="text-xl md:text-2xl text-soft-white/90 max-w-2xl mx-auto"
               >
                 Starten Sie noch heute! Wir beraten Sie gerne persönlich oder Sie nutzen unseren Konfigurator.
               </motion.p>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 className="flex flex-wrap justify-center gap-4"
               >
                 <Button 
                   size="lg" 
                   variant="gold"
                   className="px-8 py-4 text-lg group"
                   onClick={() => scrollToSection("calculator")}
                 >
                   Jetzt konfigurieren 
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
                 <Button 
                   size="lg" 
                   variant="default"
                   className="px-8 py-4 text-lg group"
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
 
       {/* Footer - NEUES DESIGNSYSTEM */}
       <footer className="py-16 px-6 border-t border-border-gray">
         <div className="max-w-6xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <Image src="/logo.jpg" alt="Stickwerk-Studio Logo" width={50} height={50} className="rounded-xl border-2 border-precision-blue/20" />
                 <span className="text-xl font-serif font-bold text-industry-gray">Stickwerk-Studio</span>
               </div>
               <p className="text-industry-gray/70 text-sm leading-relaxed">
                 Professionelle Maschinenstickerei für Patches, Logos und Textilbranding in Premium-Handwerksqualität.
               </p>
             </div>
             <div className="space-y-4">
               <h4 className="font-bold text-industry-gray text-lg">Navigation</h4>
               <div className="space-y-2">
                 <a href="#features" className="block text-industry-gray/70 hover:text-craft-gold transition-colors text-sm nav-link">Leistungen</a>
                 <a href="#zielgruppen" className="block text-industry-gray/70 hover:text-craft-gold transition-colors text-sm nav-link">Zielgruppen</a>
                 <a href="#prozess" className="block text-industry-gray/70 hover:text-craft-gold transition-colors text-sm nav-link">Prozess</a>
                 <a href="#calculator" className="block text-industry-gray/70 hover:text-craft-gold transition-colors text-sm nav-link">Konfigurator</a>
                 <a href="#faq" className="block text-industry-gray/70 hover:text-craft-gold transition-colors text-sm nav-link">FAQ</a>
               </div>
             </div>
             <div className="space-y-4">
               <h4 className="font-bold text-industry-gray text-lg">Kontakt</h4>
               <div className="space-y-2 text-sm text-industry-gray/70">
                 <p>E-Mail: info@stickwerk-studio.de</p>
                 <p>Telefon: +49 (0) 123 456789</p>
                 <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
               </div>
             </div>
             <div className="space-y-4">
               <h4 className="font-bold text-industry-gray text-lg">Rechtliches</h4>
               <div className="space-y-2 text-sm text-industry-gray/70">
                 <a href="/impressum" className="block hover:text-craft-gold transition-colors nav-link">Impressum</a>
                 <a href="/datenschutz" className="block hover:text-craft-gold transition-colors nav-link">Datenschutz</a>
                 <a href="/agb" className="block hover:text-craft-gold transition-colors nav-link">AGB</a>
               </div>
               <div className="flex gap-3 pt-4">
                 <div className="w-8 h-8 rounded-full bg-precision-blue/10 flex items-center justify-center text-precision-blue text-sm font-bold">IG</div>
                 <div className="w-8 h-8 rounded-full bg-precision-blue/10 flex items-center justify-center text-precision-blue text-sm font-bold">FB</div>
                 <div className="w-8 h-8 rounded-full bg-precision-blue/10 flex items-center justify-center text-precision-blue text-sm font-bold">X</div>
               </div>
             </div>
           </div>
           <div className="pt-8 border-t border-border-gray text-center text-sm text-industry-gray/60">
             <p>© 2026 Stickwerk-Studio. Alle Rechte vorbehalten. | DSGVO konform | Made in Germany</p>
           </div>
         </div>
       </footer>
     </main>
   );
}
