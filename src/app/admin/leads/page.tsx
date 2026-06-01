"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Inbox,
  Loader2,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Lead {
  id: string;
  created: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  patch_config?: Record<string, unknown>;
}

const statusLabels: Record<string, { label: string; color: "default" | "outline" | "secondary" | "destructive" | "green" }> = {
  new: { label: "Neu", color: "default" },
  in_progress: { label: "In Bearbeitung", color: "green" },
  quoted: { label: "Angebot erstellt", color: "secondary" },
  won: { label: "Gewonnen", color: "default" },
  lost: { label: "Verloren", color: "destructive" },
  archived: { label: "Archiviert", color: "outline" },
};

const statusFilterOptions = [
  { value: "all", label: "Alle" },
  { value: "new", label: "Neu" },
  { value: "in_progress", label: "In Bearbeitung" },
  { value: "quoted", label: "Angebot erstellt" },
  { value: "won", label: "Gewonnen" },
  { value: "lost", label: "Verloren" },
  { value: "archived", label: "Archiviert" },
];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 20;

  const fetchLeads = useCallback(async (p: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/leads?page=${p}&perPage=${perPage}`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
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
    fetchLeads(page);
  }, [page, fetchLeads]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLeads(page);
  };

  // Client-side filter on current page
  const filteredLeads = leads
    .filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.phone && lead.phone.includes(q))
        );
      }
      return true;
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">
            Anfragen
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total} Anfrage{total !== 1 ? "n" : ""} gesamt
            {filteredLeads.length !== total &&
              ` (${filteredLeads.length} gefiltert)`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/api/leads/export", "_blank")}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            CSV Export
          </Button>
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
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter */}
      {!loading && leads.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Suchen nach Name, E-Mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === option.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Lade Anfragen...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredLeads.length === 0 && (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground mb-2">
              {searchQuery || statusFilter !== "all"
                ? "Keine passenden Anfragen"
                : "Keine Anfragen vorhanden"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "Versuche einen anderen Suchbegriff oder Filter."
                : "Sobald Besucher das Kontaktformular oder den Patch-Konfigurator nutzen, erscheinen hier die eingehenden Anfragen."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Leads List */}
      {!loading && filteredLeads.length > 0 && (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const badge = statusLabels[lead.status] || {
              label: lead.status,
              color: "outline" as const,
            };
            return (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                className="block"
              >
                <Card className="border-border hover:border-accent/40 transition-colors cursor-pointer">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">
                            {lead.name}
                          </span>
                          <Badge variant={badge.color}>{badge.label}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            {lead.email}
                          </span>
                          {lead.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {lead.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(lead.created).toLocaleDateString(
                              "de-DE"
                            )}
                          </span>
                        </div>
                        {lead.message && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                            {lead.message}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Button>
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="px-1 text-muted-foreground">...</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="gap-1"
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
