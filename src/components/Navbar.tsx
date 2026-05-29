"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

// Custom hook for hash-based smooth scrolling
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    (window as any).__setMobileMenuOpen = setIsOpen;
    return () => { delete (window as any).__setMobileMenuOpen; };
  }, []);

  // Handle hash navigation for smooth scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Use smooth scroll behavior
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  }, [pathname]);

  // Helper function for smooth scroll navigation
  const handleHashNav = (e: React.MouseEvent, targetHash: string) => {
    e.preventDefault();
    const element = document.querySelector(targetHash);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL hash without page reload
      window.history.pushState(null, '', targetHash);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Stickwerk Logo"
              width={40}
              height={40}
              className="rounded-full border-2 border-primary/20"
            />
            <span className="text-xl font-serif font-bold text-primary">Stickwerk-Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              onClick={(e) => handleHashNav(e, "#features")}
              className="text-foreground/70 hover:text-accent transition-colors cursor-pointer"
            >
              Leistungen
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => handleHashNav(e, "#calculator")}
              className="text-foreground/70 hover:text-accent transition-colors cursor-pointer"
            >
              Konfigurator
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleHashNav(e, "#faq")}
              className="text-foreground/70 hover:text-accent transition-colors cursor-pointer"
            >
              FAQ
            </a>
            <Link href="/kontakt" className="text-foreground/70 hover:text-accent transition-colors">
              Kontakt
            </Link>
            <Button 
              variant="accent" 
              size="sm" 
                         onClick={(e) => handleHashNav(e, "#calculator")}
            >
              Jetzt konfigurieren
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary" aria-label="Menü">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-serif font-bold text-primary">Menu</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-primary"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                   <div className="flex flex-col gap-4">
                     <SheetClose asChild>
                       <a
                         href="#features"
                         onClick={(e) => handleHashNav(e, "#features")}
                         className="text-lg text-foreground/70 hover:text-accent transition-colors cursor-pointer block"
                       >
                         Leistungen
                       </a>
                     </SheetClose>
                     <SheetClose asChild>
                       <a
                         href="#calculator"
                         onClick={(e) => handleHashNav(e, "#calculator")}
                         className="text-lg text-foreground/70 hover:text-accent transition-colors cursor-pointer block"
                       >
                         Konfigurator
                       </a>
                     </SheetClose>
                     <SheetClose asChild>
                       <a
                         href="#faq"
                         onClick={(e) => handleHashNav(e, "#faq")}
                         className="text-lg text-foreground/70 hover:text-accent transition-colors cursor-pointer block"
                       >
                         FAQ
                       </a>
                     </SheetClose>
                     <SheetClose asChild>
                       <Link
                         href="/kontakt"
                         className="text-lg text-foreground/70 hover:text-accent transition-colors"
                       >
                         Kontakt
                       </Link>
                     </SheetClose>
                   </div>

                <div className="mt-auto pt-8">
                     <SheetClose asChild>
                       <Button 
                         variant="accent" 
                         className="w-full"
              onClick={(e) => handleHashNav(e, "#calculator")}
                       >
                         Jetzt konfigurieren
                       </Button>
                     </SheetClose>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
