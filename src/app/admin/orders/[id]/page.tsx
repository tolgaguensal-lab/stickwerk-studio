"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Package, ChevronLeft, Loader2, AlertCircle, ExternalLink,
  Clock, CheckCircle2, Truck, Send, User, Mail, Phone,
  FileText, DollarSign, ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orderStatusFlow = [
  { key: "lead_received", label: "Eingegangen", icon: Package },
  { key: "digitizing", label: "Digitalisierung", icon: FileText },
  { key: "embroidery", label: "Stickerei", icon: Clock },
  { key: "quality_check", label: "Qualitätsprüfung", icon: CheckCircle2 },
  { key: "shipping", label: "Versand", icon: Truck },
  { key: "done", label: "Erledigt", icon: CheckCircle2 },
];

const translatedStatus: Record<string, string> = {
  lead_received: "Eingegangen",
  digitizing: "Digitalisierung",
  embroidery: "Stickerei",
  quality_check: "Qualitätsprüfung",
  shipping: "Versand",
  done: "Erledigt",
  cancelled: "Storniert",
};

export default function OrderDetail() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
        setStatusHistory(data.statusHistory || []);
      } else {
        setError("Auftrag nicht gefunden.");
      }
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, statusNote: `Status geändert zu ${translatedStatus[newStatus]}` }),
      });
      if (res.ok) {
        await fetchOrder();
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Lade Auftrag...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/orders")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
        </Button>
        <Card className="border-destructive/20">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-1">Auftrag nicht gefunden</h3>
            <p className="text-sm text-muted-foreground">{error || "Der Auftrag existiert nicht."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentIdx = orderStatusFlow.findIndex(s => s.key === order.status);
  const isCancelled = order.status === "cancelled";
  const canProgress = currentIdx < orderStatusFlow.length - 1;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => router.push("/admin/orders")} className="gap-2">
        <ChevronLeft className="w-4 h-4" /> Aufträge
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">{order.orderNumber}</h1>
          <p className="text-muted-foreground text-sm mt-1">Erstellt am {new Date(order.createdAt).toLocaleDateString("de-DE", { dateStyle: "long" })}</p>
        </div>
        <Badge variant={isCancelled ? "destructive" : "default"} className="text-sm px-3 py-1">
          {translatedStatus[order.status] || order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status stepper */}
          {!isCancelled && (
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {orderStatusFlow.map((s, i) => {
                    const done = i <= currentIdx;
                    const Icon = s.icon;
                    return (
                      <div key={s.key} className="flex items-center">
                        <button
                          onClick={() => updateStatus(s.key)}
                          disabled={updating || i <= currentIdx || i > currentIdx + 1}
                          className={`flex flex-col items-center gap-1.5 group ${i <= currentIdx + 1 ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            done
                              ? "bg-accent text-accent-foreground"
                              : i === currentIdx + 1
                                ? "bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20"
                                : "bg-surface-muted text-muted-foreground"
                          }`}>
                            {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <span className="text-xs text-center text-muted-foreground">{s.label}</span>
                        </button>
                        {i < orderStatusFlow.length - 1 && (
                          <div className={`w-8 sm:w-12 h-0.5 mx-1 ${i < currentIdx ? "bg-accent/60" : "bg-surface-muted"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Customer info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
                <User className="w-5 h-5" /> Kunde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">{order.customerName}</div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <Mail className="w-3.5 h-3.5" /> {order.customerEmail}
                  </div>
                  {order.customerPhone && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <Phone className="w-3.5 h-3.5" /> {order.customerPhone}
                    </div>
                  )}
                </div>
                {order.shippingAddress && (
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Lieferadresse</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">{order.shippingAddress}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
                <Package className="w-5 h-5" /> Produkt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Typ</div>
                  <div className="font-medium text-foreground capitalize">{order.productType || "Patch"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gesamtpreis</div>
                  <div className="font-medium text-foreground">
                    {parseFloat(order.totalPrice || "0").toLocaleString("de-DE", { minimumFractionDigits: 2 })}€
                  </div>
                </div>
                {order.trackingNumber && (
                  <div>
                    <div className="text-muted-foreground">Sendungsnummer</div>
                    <div className="font-medium text-foreground">{order.trackingNumber}</div>
                  </div>
                )}
              </div>

              {order.patchConfig && Object.keys(order.patchConfig).length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Patch-Konfiguration</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {Object.entries(order.patchConfig).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-muted-foreground capitalize">{key}: </span>
                        <span className="text-foreground">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {order.notes && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-1">Notizen</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{order.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lead link */}
          {order.leadId && (
            <Link href={`/admin/leads/${order.leadId}`}
              className="flex items-center gap-2 text-sm text-accent hover:underline">
              <ExternalLink className="w-4 h-4" /> Zur zugehörigen Anfrage
            </Link>
          )}
        </div>

        {/* Sidebar - Status History */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base font-serif text-foreground">Statusverlauf</CardTitle>
            </CardHeader>
            <CardContent>
              {statusHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">Kein Verlauf.</p>
              ) : (
                <div className="space-y-4">
                  {statusHistory.map((entry: any, i: number) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${i === 0 ? "bg-accent" : "bg-surface-muted"}`} />
                        {i < statusHistory.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{translatedStatus[entry.status] || entry.status}</div>
                        {entry.note && <div className="text-xs text-muted-foreground mt-0.5">{entry.note}</div>}
                        <div className="text-xs text-muted-foreground/60 mt-0.5">
                          {new Date(entry.changedAt).toLocaleString("de-DE")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {!isCancelled && currentIdx < orderStatusFlow.length - 1 && (
            <Button
              onClick={() => updateStatus(orderStatusFlow[currentIdx + 1].key)}
              disabled={updating}
              className="w-full gap-2"
            >
              {updating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowLeft className="w-4 h-4 rotate-180" />
              )}
              {updating ? "Wird aktualisiert..." : `Weiter zu "${orderStatusFlow[currentIdx + 1].label}"`}
            </Button>
          )}
          {isCancelled && (
            <p className="text-sm text-destructive text-center">Dieser Auftrag wurde storniert.</p>
          )}
        </div>
      </div>
    </div>
  );
}
