"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ChevronLeft, Loader2, AlertCircle, User, Mail, Phone,
  Inbox, ShoppingBag, Euro, Package, ExternalLink, Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leadStatusBadge: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "green" | "outline" }> = {
  new: { label: "Neu", color: "default" },
  in_progress: { label: "In Bearbeitung", color: "secondary" },
  quoted: { label: "Angebot", color: "secondary" },
  won: { label: "Gewonnen", color: "green" },
  lost: { label: "Verloren", color: "destructive" },
  archived: { label: "Archiviert", color: "outline" },
};

export default function CustomerDetail() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomer = useCallback(async () => {
    setError(null);
    try {
      const email = decodeURIComponent(params.email as string);
      const res = await fetch(`/api/customers?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        setError("Kunde nicht gefunden.");
      }
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  }, [params.email]);

  useEffect(() => { fetchCustomer(); }, [fetchCustomer]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Lade Kunde...</span>
        </div>
      </div>
    );
  }

  if (error || !data?.customer) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/customers")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
        </Button>
        <Card className="border-destructive/20">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-1">Kunde nicht gefunden</h3>
            <p className="text-sm text-muted-foreground">{error || "Der Kunde existiert nicht."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { customer, leads, orders } = data;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/admin/customers")} className="gap-2">
        <ChevronLeft className="w-4 h-4" /> Kunden
      </Button>

      {/* Customer header */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-serif text-foreground truncate">{customer.name || "Unbekannt"}</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {customer.email}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">{customer.totalLeads}</div>
                <div className="text-muted-foreground">Anfragen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">{customer.totalOrders}</div>
                <div className="text-muted-foreground">Aufträge</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">
                  {Math.round(customer.totalRevenue).toLocaleString("de-DE")}€
                </div>
                <div className="text-muted-foreground">Umsatz</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
              <Inbox className="w-5 h-5" /> Anfragen ({leads?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(!leads || leads.length === 0) ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Keine Anfragen.</p>
            ) : (
              <div className="space-y-3">
                {leads.map((lead: any) => (
                  <Link key={lead.id} href={`/admin/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/5 transition-colors group">
                    <div>
                      <div className="text-sm text-foreground">
                        {lead.patchConfig && typeof lead.patchConfig === "object" && "shape" in lead.patchConfig
                          ? `Patch (${lead.patchConfig.shape as string})`
                          : "Patch-Anfrage"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(lead.created).toLocaleDateString("de-DE", { dateStyle: "medium" })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={leadStatusBadge[lead.status]?.color || "outline"}>
                        {leadStatusBadge[lead.status]?.label || lead.status}
                      </Badge>
                      <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Aufträge ({orders?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(!orders || orders.length === 0) ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Keine Aufträge.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order: any) => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/5 transition-colors group">
                    <div>
                      <div className="text-sm font-medium text-foreground">{order.orderNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("de-DE", { dateStyle: "medium" })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {order.totalPrice && parseFloat(order.totalPrice) > 0 && (
                        <span className="text-foreground">{parseFloat(order.totalPrice).toLocaleString("de-DE", { minimumFractionDigits: 2 })}€</span>
                      )}
                      <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
