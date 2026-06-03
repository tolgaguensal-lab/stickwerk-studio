"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package, Loader2, RefreshCw, AlertCircle, Search,
  ChevronRight, FileText, ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const orderStatusBadge: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "green" | "outline" }> = {
  lead_received: { label: "Eingegangen", color: "default" },
  digitizing: { label: "Digitalisierung", color: "secondary" },
  embroidery: { label: "Stickerei", color: "default" },
  quality_check: { label: "Qualitätsprüfung", color: "secondary" },
  shipping: { label: "Versand", color: "default" },
  done: { label: "Erledigt", color: "green" },
  cancelled: { label: "Storniert", color: "destructive" },
};

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = useCallback(async () => {
    setError(null);
    try {
      const url = statusFilter !== "all" ? `/api/orders?status=${statusFilter}` : "/api/orders";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      } else {
        setError("Fehler beim Laden der Aufträge.");
      }
    } catch {
      setError("Verbindungsfehler zum Server.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const filteredOrders = orders.filter(o => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.orderNumber?.toLowerCase().includes(q) ||
      o.customerName?.toLowerCase().includes(q) ||
      o.customerEmail?.toLowerCase().includes(q)
    );
  });

  const statuses = ["all", "lead_received", "digitizing", "embroidery", "quality_check", "shipping", "done", "cancelled"];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Lade Aufträge...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">Aufträge</h1>
          <p className="text-muted-foreground text-sm mt-1">Alle Aufträge verwalten</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOrders} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Aktualisieren
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <Card className="border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-10 h-10 text-destructive/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchOrders} className="mt-3">
              Erneut versuchen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Auftragsnummer, Kunde oder E-Mail..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statuses.map(s => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="shrink-0"
            >
              {s === "all" ? "Alle" : (orderStatusBadge[s]?.label || s)}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      {!error && (
        <>
          {filteredOrders.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-serif text-foreground mb-1">Keine Aufträge gefunden</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? "Anpassung der Suchbegriffe." : "Noch keine Aufträge vorhanden."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order: any) => (
                <button
                  key={order.id}
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                  className="w-full text-left flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent/5 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{order.orderNumber}</div>
                      <div className="text-sm text-muted-foreground truncate">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.customerEmail} &middot; {new Date(order.createdAt).toLocaleDateString("de-DE")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {order.totalPrice && parseFloat(order.totalPrice) > 0 && (
                      <span className="text-sm font-medium text-foreground">
                        {parseFloat(order.totalPrice).toLocaleString("de-DE", { minimumFractionDigits: 2 })}€
                      </span>
                    )}
                    <Badge variant={orderStatusBadge[order.status]?.color || "outline"}>
                      {orderStatusBadge[order.status]?.label || order.status}
                    </Badge>
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
