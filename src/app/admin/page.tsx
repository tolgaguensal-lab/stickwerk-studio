"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Inbox,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  Archive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  created: string;
  name: string;
  email: string;
  status: string;
}

const statusLabels: Record<string, { label: string; color: "default" | "outline" | "secondary" | "destructive" | "green" }> = {
  new: { label: "Neu", color: "default" },
  in_progress: { label: "In Bearbeitung", color: "green" },
  quoted: { label: "Angebot erstellt", color: "secondary" },
  won: { label: "Gewonnen", color: "default" },
  lost: { label: "Verloren", color: "destructive" },
  archived: { label: "Archiviert", color: "outline" },
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      } else {
        setError("Datenbank nicht erreichbar.");
      }
    } catch {
      setError("Verbindungsfehler zum Server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLeads();
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    inProgress: leads.filter((l) => l.status === "in_progress").length,
    quoted: leads.filter((l) => l.status === "quoted").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
    archived: leads.filter((l) => l.status === "archived").length,
  };

  const statCards = [
    {
      label: "Neue Anfragen",
      value: stats.new,
      icon: Inbox,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "In Bearbeitung",
      value: stats.inProgress,
      icon: Clock,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Angebote erstellt",
      value: stats.quoted,
      icon: TrendingUp,
      color: "text-foreground",
      bg: "bg-muted",
    },
    {
      label: "Gewonnen",
      value: stats.won,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Verloren",
      value: stats.lost,
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Archiviert",
      value: stats.archived,
      icon: Archive,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Übersicht über alle Anfragen
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Aktualisieren
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Lade Daten...</span>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && leads.length === 0 && !error && (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-2">
              Keine Anfragen vorhanden
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Sobald Besucher das Kontaktformular oder den Patch-Konfigurator
              nutzen, erscheinen hier die eingehenden Anfragen.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Leads */}
      {!loading && recentLeads.length > 0 && (
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-serif text-foreground">
              Neueste Anfragen
            </CardTitle>
            <Link href="/admin/leads">
              <Button variant="ghost" size="sm" className="gap-1 text-sm">
                Alle anzeigen
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentLeads.map((lead) => {
                const badge = statusLabels[lead.status] || {
                  label: lead.status,
                  color: "outline" as const,
                };
                return (
                  <Link
                    key={lead.id}
                    href={`/admin/leads/${lead.id}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-accent/5 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">
                        {lead.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {lead.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={badge.color}>{badge.label}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lead.created).toLocaleDateString("de-DE")}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Total count */}
      {!loading && leads.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Insgesamt {leads.length} Anfrage{leads.length !== 1 ? "n" : ""}
        </p>
      )}
    </div>
  );
}
