"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Inbox, TrendingUp, CheckCircle2, Clock, Loader2, RefreshCw,
  AlertCircle, ArrowRight, Package, DollarSign, BarChart3, ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusBadge: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "green" | "outline" }> = {
  new: { label: "Neu", color: "default" },
  in_progress: { label: "In Bearbeitung", color: "secondary" },
  quoted: { label: "Angebot", color: "secondary" },
  won: { label: "Gewonnen", color: "green" },
  lost: { label: "Verloren", color: "destructive" },
  archived: { label: "Archiviert", color: "outline" },
};

const orderStatusBadge: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "green" | "outline" }> = {
  lead_received: { label: "Eingegangen", color: "default" },
  digitizing: { label: "Digitalisierung", color: "secondary" },
  embroidery: { label: "Stickerei", color: "default" },
  quality_check: { label: "Qualitätsprüfung", color: "secondary" },
  shipping: { label: "Versand", color: "default" },
  done: { label: "Erledigt", color: "green" },
  cancelled: { label: "Storniert", color: "destructive" },
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const [leadsRes, ordersRes, statsRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/orders"),
        fetch("/api/stats"),
      ]);
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.orders || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch {
      setError("Verbindungsfehler zum Server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Lade Dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive/20">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-2">Fehler</h3>
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button variant="outline" onClick={fetchAll} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" /> Erneut versuchen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeOrders = orders.filter(o => !["done", "cancelled"].includes(o.status));
  const recentLeads = [...leads].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Übersicht über Anfragen, Aufträge und Umsatz</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchAll} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Aktualisieren
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Neue Anfragen</span>
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-foreground">{stats?.newLeads ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">In Bearbeitung</span>
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-foreground">{stats?.inProgressLeads ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Aktive Aufträge</span>
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-foreground">{stats?.activeOrders ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Umsatz (Monat)</span>
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-foreground">
              {Math.round(stats?.revenueThisMonth ?? 0).toLocaleString("de-DE")}€
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-serif text-foreground">Aktuelle Anfragen</CardTitle>
              <Link href="/admin/leads" className="text-sm text-accent hover:underline flex items-center gap-1">
                Alle anzeigen <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Keine Anfragen vorhanden.</p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead: any) => (
                  <Link key={lead.id} href={`/admin/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/5 transition-colors group">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">{lead.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{lead.email}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={statusBadge[lead.status]?.color || "outline"}>
                        {statusBadge[lead.status]?.label || lead.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lead.created).toLocaleDateString("de-DE")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Orders */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-serif text-foreground">Aufträge in Produktion</CardTitle>
              <Link href="/admin/orders" className="text-sm text-accent hover:underline flex items-center gap-1">
                Alle anzeigen <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {activeOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Keine aktiven Aufträge.</p>
            ) : (
              <div className="space-y-3">
                {activeOrders.slice(0, 5).map((order: any) => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/5 transition-colors group">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">{order.orderNumber}</div>
                      <div className="text-xs text-muted-foreground truncate">{order.customerName}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={orderStatusBadge[order.status]?.color || "outline"}>
                        {orderStatusBadge[order.status]?.label || order.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("de-DE")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Configurations */}
      {stats?.popularShapes && stats.popularShapes.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> Beliebte Konfigurationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Formen</h4>
                <div className="space-y-2">
                  {stats.popularShapes.map((item: any) => {
                    const maxCount = Math.max(...stats.popularShapes.map((s: any) => s.count));
                    const pct = (item.count / maxCount) * 100;
                    const names: Record<string, string> = { circle: "Rund", rectangle: "Rechteckig", shield: "Schild", oval: "Oval", diamond: "Raute", custom: "Individuell" };
                    return (
                      <div key={item.shape} className="flex items-center gap-3">
                        <span className="text-sm text-foreground w-28">{names[item.shape] || item.shape}</span>
                        <div className="flex-1 h-6 bg-surface-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent/60 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Größen</h4>
                <div className="space-y-2">
                  {stats.popularSizes.map((item: any) => {
                    const maxCount = Math.max(...stats.popularSizes.map((s: any) => s.count));
                    const pct = (item.count / maxCount) * 100;
                    const names: Record<string, string> = { small: "Klein", medium: "Mittel", large: "Groß", xl: "Extra Groß" };
                    return (
                      <div key={item.size} className="flex items-center gap-3">
                        <span className="text-sm text-foreground w-28">{names[item.size] || item.size}</span>
                        <div className="flex-1 h-6 bg-surface-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent/60 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
