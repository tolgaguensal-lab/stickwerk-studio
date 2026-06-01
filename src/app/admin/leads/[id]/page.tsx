"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  created: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  patch_config?: Record<string, unknown>;
  admin_notes?: string;
  source?: string;
}

const statusConfig: Record<
  string,
  { label: string; color: "default" | "outline" | "secondary" | "destructive" | "green"; next: string[] }
> = {
  new: { label: "Neu", color: "default", next: ["in_progress", "archived"] },
  in_progress: { label: "In Bearbeitung", color: "green", next: ["quoted", "lost", "archived"] },
  quoted: { label: "Angebot erstellt", color: "secondary", next: ["won", "lost", "in_progress"] },
  won: { label: "Gewonnen", color: "default", next: ["archived"] },
  lost: { label: "Verloren", color: "destructive", next: ["archived"] },
  archived: { label: "Archiviert", color: "outline", next: [] },
};

const configLabels: Record<string, string> = {
  shape: "Form",
  size: "Größe",
  complexity: "Komplexität",
  backing: "Rückseite",
  material: "Material",
  colors: "Farben",
  quantity: "Menge",
  edge: "Rand",
  express: "Express",
};

export default function LeadDetail() {
  const params = useParams();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  const fetchLead = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(`/api/leads/${id}`);
      if (response.ok) {
        const data = await response.json();
        setLead(data.lead);
        setAdminNotes(data.lead.admin_notes || "");
      } else {
        setError("Anfrage konnte nicht geladen werden.");
      }
    } catch {
      setError("Verbindungsfehler zum Server.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });
      if (response.ok) {
        const data = await response.json();
        setLead(data.lead);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const saveNotes = async () => {
    if (!lead) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: lead.status, adminNotes }),
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Lade Anfrage...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !lead) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-2">
              Fehler beim Laden
            </h3>
            <p className="text-muted-foreground text-sm">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = statusConfig[lead.status] || {
    label: lead.status,
    color: "outline" as const,
    next: [],
  };

  const patchConfig = lead.patch_config || {};
  const hasDesignFile = patchConfig && typeof patchConfig === "object" && "designFile" in patchConfig;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zur Übersicht
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">
              {lead.name}
            </h1>
            <Badge variant={status.color}>{status.label}</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Anfrage vom{" "}
            {new Date(lead.created).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Save Success */}
      {saveSuccess && (
        <div className="p-3 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2 text-success text-sm">
          <CheckCircle2 className="w-4 h-4" />
          Gespeichert
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-foreground">
                Kontaktdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-accent hover:underline"
                >
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">
                  {new Date(lead.created).toLocaleString("de-DE")}
                </span>
              </div>
              {lead.source && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Quelle:
                  </span>
                  <span className="text-foreground">{lead.source}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message */}
          {lead.message ? (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Nachricht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {lead.message}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {/* Patch Configuration */}
          {Object.keys(patchConfig).length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Konfiguration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(patchConfig).map(([key, value]) => {
                    if (!value) return null;
                    const label = configLabels[key] || key;
                    return (
                      <div key={key}>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="text-foreground font-medium mt-0.5">
                          {String(value)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Design Files */}
          {hasDesignFile ? (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Design-Dateien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/20">
                  <div className="text-sm text-foreground font-medium">
                    {String((patchConfig.designFile as Record<string, unknown>)?.name || "")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {String((patchConfig.designFile as Record<string, unknown>)?.type || "")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Admin Notes */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-foreground">
                Admin-Notizen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
                placeholder="Interne Notizen zu dieser Anfrage..."
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              />
              <Button
                variant="default"
                size="sm"
                onClick={saveNotes}
                disabled={saving}
                className="gap-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Notizen speichern
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Status Actions */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-foreground">
                Status ändern
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {status.next.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Diese Anfrage ist abgeschlossen. Keine weiteren
                  Statusänderungen möglich.
                </p>
              )}
              {status.next.map((nextStatus) => {
                const next = statusConfig[nextStatus];
                if (!next) return null;
                return (
                  <Button
                    key={nextStatus}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Status auf "${next.label}" setzen?`)) {
                        updateStatus(nextStatus);
                      }
                    }}
                    disabled={saving}
                    className="w-full justify-start gap-2"
                  >
                    → {next.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
