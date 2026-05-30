"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Scroll tracking: bg opacity goes from 70% to 95%, shadow appears after 80px
  const bgOpacity = useTransform(scrollY, [0, 160], [0.7, 0.95]);
  const navBg = useTransform(bgOpacity, (o) => `rgba(247, 241, 230, ${o})`);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    (window as unknown as { __setMobileMenuOpen: (value: boolean) => void }).__setMobileMenuOpen = setIsOpen;
    return () => { delete (window as unknown as { __setMobileMenuOpen: unknown }).__setMobileMenuOpen; };
  }, []);

  // Handle hash navigation for smooth scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  }, [pathname]);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = [
      { id: "features", label: "Leistungen" },
      { id: "calculator", label: "Konfigurator" },
      { id: "faq", label: "FAQ" },
      { id: "kontakt", label: "Kontakt" },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            current = section.id;
            break;
          }
        }
      }

      // If on /kontakt page, mark it active
      if (pathname === "/kontakt") current = "kontakt";

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
      window.history.pushState(null, '', targetHash);
    }
    setIsOpen(false);
  };

  const isActive = (id: string) => activeSection === id;

  const navLinks = [
    { id: "features", label: "Leistungen", href: "#features", hash: true },
    { id: "calculator", label: "Konfigurator", href: "#calculator", hash: true },
    { id: "faq", label: "FAQ", href: "#faq", hash: true },
    { id: "kontakt", label: "Kontakt", href: "/kontakt", hash: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ backgroundColor: navBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.jpg"
                alt="Stickwerk-Studio Logo"
                width={52}
                height={52}
                className="rounded-xl shadow-sm ring-1 ring-border/40 group-hover:shadow-md group-hover:ring-accent/30 transition-all duration-300"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-semibold text-foreground tracking-tight leading-tight">
                Stickwerk-Studio
              </span>
              <span className="text-[10px] md:text-[11px] text-accent/70 font-sans tracking-[0.2em] uppercase hidden sm:block">
                Maschinenstickerei
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hash ? (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleHashNav(e, link.href)}
                  className={`relative px-4 py-2 text-sm tracking-wide font-medium transition-colors rounded-lg ${
                    isActive(link.id)
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                  {isActive(link.id) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm tracking-wide font-medium transition-colors rounded-lg ${
                    isActive(link.id)
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                  {isActive(link.id) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
            <div className="ml-4 pl-4 border-l border-border">
              <Button
                variant="default"
                size="sm"
                onClick={(e) => handleHashNav(e, "#calculator")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
              >
                Jetzt konfigurieren
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-foreground/5" aria-label="Menü">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l border-border">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 pt-2">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/logo.jpg"
                        alt="Stickwerk-Studio Logo"
                        width={40}
                        height={40}
                        className="rounded-lg shadow-sm ring-1 ring-border/40"
                      />
                      <span className="font-serif font-semibold text-foreground tracking-tight">Stickwerk-Studio</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:bg-foreground/5"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) =>
                      link.hash ? (
                        <SheetClose asChild key={link.id}>
                          <a
                            href={link.href}
                            onClick={(e) => handleHashNav(e, link.href)}
                            className={`text-base px-4 py-3 rounded-xl transition-colors ${
                              isActive(link.id)
                                ? "text-accent bg-accent/5 font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            {link.label}
                          </a>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild key={link.id}>
                          <Link
                            href={link.href}
                            className={`text-base px-4 py-3 rounded-xl transition-colors ${
                              isActive(link.id)
                                ? "text-accent bg-accent/5 font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      )
                    )}
                  </div>

                  <div className="mt-auto pt-8">
                    <SheetClose asChild>
                      <Button
                        variant="default"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
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

      {/* Bottom border that fades in on scroll */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </motion.nav>
  );
}
