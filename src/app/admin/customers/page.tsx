"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Loader2, RefreshCw, AlertCircle, Search,
  ChevronRight, Mail, ShoppingBag, Inbox,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCustomers() {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/customers");
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers || []);
      } else {
        setError("Fehler beim Laden der Kunden.");
      }
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const filtered = customers.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Lade Kunden...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">Kunden</h1>
          <p className="text-muted-foreground text-sm mt-1">Alle Kunden mit Anfragen und Aufträgen</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchCustomers} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Aktualisieren
        </Button>
      </div>

      {error && (
        <Card className="border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-10 h-10 text-destructive/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchCustomers} className="mt-3">Erneut versuchen</Button>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Kunde oder E-Mail suchen..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {!error && (
        <>
          {filtered.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-serif text-foreground mb-1">Keine Kunden gefunden</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? "Anpassung der Suchbegriffe." : "Noch keine Kunden vorhanden."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((customer: any) => (
                <button
                  key={customer.email}
                  onClick={() => router.push(`/admin/customers/${encodeURIComponent(customer.email)}`)}
                  className="w-full text-left flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent/5 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{customer.name || "Unbekannt"}</div>
                      <div className="text-sm text-muted-foreground truncate flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> {customer.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Inbox className="w-3.5 h-3.5" /> {customer.totalLeads}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" /> {customer.totalOrders}
                      </span>
                    </div>
                    {customer.lastLeadDate && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(customer.lastLeadDate).toLocaleDateString("de-DE")}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-accent transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
