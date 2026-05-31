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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Scroll tracking
  const bgOpacity = useTransform(scrollY, [0, 200], [0.6, 0.95]);
  const navBg = useTransform(bgOpacity, (o) => `rgba(247, 241, 230, ${o})`);
  const shadowOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const navShadow = useTransform(shadowOpacity, (o) => `0 1px 3px rgba(0,0,0,${o * 0.06}), 0 1px 2px rgba(0,0,0,${o * 0.04})`);

  useEffect(() => {
    (window as unknown as { __setMobileMenuOpen: (value: boolean) => void }).__setMobileMenuOpen = setIsOpen;
    return () => { delete (window as unknown as { __setMobileMenuOpen: unknown }).__setMobileMenuOpen; };
  }, []);

  // Handle hash navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [pathname]);

  // Track scrolled state and active section
  useEffect(() => {
    const sections = [
      { id: "features", label: "Leistungen" },
      { id: "calculator", label: "Konfigurator" },
      { id: "faq", label: "FAQ" },
    ];

    const handleScroll = () => {
      const pos = window.scrollY;
      setScrolled(pos > 50);

      const scrollPos = pos + 140;
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

      if (pathname === "/kontakt") current = "kontakt";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleHashNav = (e: React.MouseEvent, targetHash: string) => {
    e.preventDefault();
    const element = document.querySelector(targetHash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      style={{
        backgroundColor: navBg,
        boxShadow: navShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="px-6 lg:px-10">
            <div className="flex items-center justify-between h-[72px] lg:h-[72px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Image
                  src="/brand/logo-mark.svg"
                  alt="Stickwerk-Studio"
                  width={36}
                  height={36}
                  className="group-hover:opacity-80 transition-opacity"
                  priority
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-[18px] lg:text-[20px] font-serif font-bold text-foreground tracking-tight leading-none">
                    Stickwerk-Studio
                  </span>
                  <span className="text-[10px] lg:text-[11px] text-accent/60 font-sans tracking-[0.2em] uppercase mt-0.5">
                    Maschinenstickerei &amp; Custom Patches
                  </span>
                </div>
              </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.id);
              const Comp = link.hash ? "a" : Link;
              const props = link.hash
                ? { href: link.href, onClick: (e: React.MouseEvent) => handleHashNav(e, link.href) }
                : { href: link.href };

              return (
                <Comp
                  key={link.id}
                  {...props}
                  className={`relative px-5 py-2.5 text-[15px] font-medium tracking-wide transition-all duration-200 rounded-xl ${
                    active
                      ? "text-accent bg-accent/8"
                      : "text-muted-foreground/90 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Comp>
              );
            })}
            <div className="ml-6 pl-6 border-l border-border/60">
              <Button
                variant="default"
                size="default"
                onClick={(e) => handleHashNav(e, "#calculator")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm px-6 py-2.5 h-auto text-[15px] font-medium"
              >
                Jetzt konfigurieren
              </Button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => handleHashNav(e, "#calculator")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm text-xs px-4 h-9"
            >
              Konfigurieren
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-foreground/5 w-10 h-10" aria-label="Menü">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-card border-l border-border p-0">
                <div className="flex flex-col h-full px-6 py-6">
                  <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/brand/logo-mark.svg"
                      alt="Stickwerk-Studio"
                      width={28}
                      height={28}
                    />
                    <span className="font-serif font-semibold text-foreground text-[18px] tracking-tight">Stickwerk-Studio</span>
                  </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:bg-foreground/5 w-10 h-10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const active = isActive(link.id);
                      return link.hash ? (
                        <SheetClose asChild key={link.id}>
                          <a
                            href={link.href}
                            onClick={(e) => handleHashNav(e, link.href)}
                            className={`text-lg px-4 py-3.5 rounded-xl transition-colors ${
                              active
                                ? "text-accent bg-accent/8 font-semibold"
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
                            className={`text-lg px-4 py-3.5 rounded-xl transition-colors ${
                              active
                                ? "text-accent bg-accent/8 font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-10">
                    <SheetClose asChild>
                      <Button
                        variant="default"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm h-12 text-base"
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

      {/* Bottom border */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-border/50 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </motion.nav>
  );
}
