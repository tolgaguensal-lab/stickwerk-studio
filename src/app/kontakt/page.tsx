"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Allgemeine Anfrage",
    message: "",
  });
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name.trim() || !formData.email.trim()) {
        setError("Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        setLoading(false);
        return;
      }

      if (!consentPrivacy) {
        setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consentPrivacy: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Ein Fehler ist aufgetreten.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Allgemeine Anfrage",
        message: "",
      });
      setConsentPrivacy(false);
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-Mail",
      content: "info@stickwerk-studio.de",
      link: "mailto:info@stickwerk-studio.de",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon",
      content: "+49 (0) 123 456789",
      link: "tel:+49123456789",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "Musterstraße 123, 10115 Berlin, Deutschland",
      link: null,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Öffnungszeiten",
      content: "Mo-Fr: 9:00 - 18:00 Uhr",
      link: null,
    },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Kontakt
            </h1>
            <p className="text-foreground/70">
              Wir freuen uns auf Ihre Nachricht!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-2 border-accent/30 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  Nachricht gesendet! <span className="text-accent">&rarr;</span>
                </h2>
                <p className="text-foreground/70 mb-8">
                  Vielen Dank für Ihre Nachricht. Wir werden uns innerhalb von
                  24-48 Stunden bei Ihnen melden.
                </p>
                <Link href="/">
                  <Button variant="accent" size="lg" className="group">
                    Zur&uuml;ck zur Startseite
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Wir beraten Sie gerne persönlich oder beantworten Ihre Fragen zum
            Patch-Konfigurator und unseren Leistungen.
          </p>
        </motion.div>

        {/* Back Link */}
        <div className="flex justify-start">
          <Link href="/" className="text-primary hover:text-accent transition-colors flex items-center gap-2">
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Schreiben Sie uns
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl mb-6 flex items-center gap-3 text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">
                        Name*
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ihr voller Name"
                        required
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">
                        E-Mail*
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@beispiel.de"
                        required
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">
                        Telefon
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+49 ..."
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70">
                        Betreff
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all bg-background"
                      >
                        <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                        <option value="Patch-Konfigurator">Patch-Konfigurator</option>
                        <option value="Angebotsanfrage">Angebotsanfrage</option>
                        <option value="Technische Frage">Technische Frage</option>
                        <option value="Beschwerde">Beschwerde</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/70">
                      Ihre Nachricht*
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Wie k&ouml;nnen wir Ihnen helfen?"
                      required
                      className="w-full p-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <input
                      type="checkbox"
                      id="consent-privacy"
                      checked={consentPrivacy}
                      onChange={(e) => setConsentPrivacy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-primary/30 text-accent focus:ring-accent"
                    />
                    <label htmlFor="consent-privacy" className="text-sm text-foreground/70">
                      Ich stimme der <Link href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</Link> zu. 
                      Meine Daten werden ausschließlich zur Bearbeitung meiner Anfrage verwendet.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={loading || !consentPrivacy}
                    className="w-full group"
                  >
                    {loading ? (
                      <>
                        <span className="animate-pulse">Senden...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-foreground/60 text-center">
                    * Pflichtfelder. Ihre Daten werden nur zur Bearbeitung Ihrer
                    Anfrage verwendet und nicht an Dritte weitergegeben.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Kontaktinformationen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-accent mt-0.5">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-primary">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-foreground/80 hover:text-accent transition-colors text-sm whitespace-nowrap"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-foreground/80 text-sm">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white/60 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Schnellzugriff
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/#calculator"
                  className="block p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors text-center font-medium"
                >
                  Zum Patch-Konfigurator
                </Link>
                <Link
                  href="/#faq"
                  className="block p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors text-center font-medium"
                >
                  Häufige Fragen
                </Link>
                <Link
                  href="/impressum"
                  className="block p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors text-center font-medium"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="block p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors text-center font-medium"
                >
                  Datenschutz
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
