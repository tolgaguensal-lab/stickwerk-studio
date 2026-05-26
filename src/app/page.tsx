"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, PenTool, Zap, Heart } from "lucide-react";
import PatchCalculator from "@/components/PatchCalculator";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
            <Image 
              src="/logo.jpg" 
              alt="Stickwerk Logo" 
              width={180} 
              height={180} 
              className="rounded-full shadow-2xl border-4 border-white"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold text-primary leading-tight"
          >
            Fäden, die Marken <br /> 
            <span className="text-accent italic">sichtbar machen</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            Exklusive Stickkunst für anspruchsvolle Marken. Präzision, Haptik und Design in jedem Stich.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="px-8 py-6 text-lg rounded-full group">
              Jetzt konfigurieren 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Das Stickwerk-Versprechen</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap />, title: "Digitale Präzision", text: "Wir optimieren jedes Motiv für die Stickmaschine, damit jede Linie perfekt sitzt." },
              { icon: <Heart />, title: "Haptische Qualität", text: "Nur erstklassige Garne und langlebige Materialien. Qualität, die man fühlt." },
              { icon: <PenTool />, title: "Persönlicher Dialog", text: "Individuelle Beratung zu Form und Material für Ihr perfektes Ergebnis." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-accent/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-32 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Ihr Patch-Konfigurator</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Gestalten Sie Ihren Patch in Echtzeit und erhalten Sie eine sofortige Kostenschätzung.
            </p>
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
    </main>
  );
}
