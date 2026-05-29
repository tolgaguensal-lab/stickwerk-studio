"use client";

import { useState, useEffect, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Search,
  Funnel,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  calculationData: {
    shape?: string;
    size?: string;
    complexity?: string;
    backing?: string;
    material?: string;
    colors?: number;
    quantity?: number;
    edge?: string;
    express?: string;
  };
  status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

// Status update function
async function updateLeadStatus(leadId: string, newStatus: Lead["status"]): Promise<boolean> {
  try {
    // Skip demo leads (they don't exist in the database)
    if (leadId.startsWith("demo-")) {
      alert("Demo-Leads können nicht aktualisiert werden. Bitte verbinden Sie Ihre Datenbank.");
      return false;
    }

    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Status update error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Status update failed:", error);
    return false;
  }
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch leads from API
  async function fetchLeads() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = (await response.json()) as { leads?: Lead[] };
        setLeads(data.leads || []);
      } else {
        setError("Failed to fetch leads. Please check your connection.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching leads."
      );
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch - fetchLeads is async and calls setState in callback
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchLeads();
  }, []);

  // Refresh function
  async function handleRefresh() {
    setRefreshing(true);
    await fetchLeads();
    setRefreshing(false);
  }

  // Status update handler
  async function handleStatusUpdate(leadId: string, newStatus: Lead["status"]) {
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      // Refresh leads to get updated data
      await fetchLeads();
    } else {
      alert("Failed to update lead status. Please try again.");
    }
  }

  // Fallback: Use mock data if API fails and no leads loaded
  const hasLeads = leads.length > 0;
  const displayLeads = hasLeads
    ? leads
    : [
        {
          id: "demo-1",
          createdAt: new Date().toISOString(),
          name: "Demo Lead (API not connected)",
          email: "demo@example.com",
          phone: "+49 123 456789",
          message: "This is a demo lead. Connect your database to see real data.",
          calculationData: {
            shape: "circle",
            size: "medium",
            complexity: "medium",
            backing: "sewn",
            material: "twill",
            colors: 4,
            quantity: 50,
          } as Record<string, unknown>,
          status: "NEW",
        },
      ];

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: "default" | "gold" | "secondary" | "outline" }
    > = {
      NEW: { label: "Neu", variant: "default" },
      IN_PROGRESS: { label: "In Bearbeitung", variant: "gold" },
      COMPLETED: { label: "Abgeschlossen", variant: "secondary" },
      CANCELLED: { label: "Abgebrochen", variant: "outline" },
    };
    return variants[status] || { label: status, variant: "outline" };
  };

  const stats = {
    total: displayLeads.length,
    new: displayLeads.filter((l) => l.status === "NEW").length,
    inProgress: displayLeads.filter((l) => l.status === "IN_PROGRESS").length,
    completed: displayLeads.filter((l) => l.status === "COMPLETED").length,
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Suspense fallback={null}>
        <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary">
              Lead Management
            </h1>
            <p className="text-foreground/60 mt-2">
              Verwalten Sie alle Anfragen und Orders an einem Ort
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="hover:bg-primary/5"
            >
              {refreshing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
            </Button>
             <Button variant="gold" size="lg">
               + Neuer Lead
             </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
            <p className="font-medium">Fehler:</p>
            <p>{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="mt-2 h-auto p-1 text-destructive hover:text-destructive/80"
            >
              Erneut versuchen
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && !hasLeads && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center gap-4 bg-background p-8 rounded-3xl border border-primary/10 shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-primary font-semibold">
                Leads werden geladen...
              </span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={loading && !hasLeads ? "opacity-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Gesamt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className={loading && !hasLeads ? "opacity-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Neue Anfragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.new}</div>
            </CardContent>
          </Card>
          <Card className={loading && !hasLeads ? "opacity-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                In Bearbeitung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary/70">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>
          <Card className={loading && !hasLeads ? "opacity-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Abgeschlossen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground/40">
                {stats.completed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="pipeline">
              <Funnel className="w-4 h-4 mr-2" />
              Pipeline Ansicht
            </TabsTrigger>
            <TabsTrigger value="list">
              <Search className="w-4 h-4 mr-2" />
              Listen Ansicht
            </TabsTrigger>
          </TabsList>

          {/* Pipeline View */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(
                (status) => (
                  <Card key={status} className="flex flex-col">
                    <CardHeader className="pb-3 border-b">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{getStatusBadge(status).label}</span>
                        <Badge variant={getStatusBadge(status).variant}>
                          {displayLeads.filter((l) => l.status === status).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 space-y-3 flex-1">
                      {displayLeads
                        .filter((l) => l.status === status)
                        .map((lead) => (
                          <div
                            key={lead.id}
                            className="p-4 bg-muted rounded-lg border cursor-pointer hover:bg-muted/80 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="font-semibold text-primary truncate flex-1">
                                {lead.name}
                              </div>
                              <Badge
                                variant={getStatusBadge(lead.status).variant}
                                className="shrink-0"
                              >
                                {getStatusBadge(lead.status).label}
                              </Badge>
                            </div>
                            <div className="text-xs text-foreground/60 space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{lead.email}</span>
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {lead.phone}
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {new Date(lead.createdAt).toLocaleDateString(
                                  "de-DE"
                                )}
                              </div>
                               <div className="font-medium text-accent">
                                 {((lead.calculationData?.quantity as number | undefined) ?? 0)} Stück
                               </div>
                            </div>
                            {/* Status update buttons (visible on hover) */}
                            <div className="mt-3 pt-3 border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              {lead.status !== "IN_PROGRESS" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(lead.id, "IN_PROGRESS");
                                  }}
                                >
                                  In Bearbeitung
                                </Button>
                              )}
                              {lead.status !== "COMPLETED" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(lead.id, "COMPLETED");
                                  }}
                                >
                                  Abgeschlossen
                                </Button>
                              )}
                              {lead.status !== "CANCELLED" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      confirm(
                                        `Möchten Sie diese Anfrage wirklich als abgebrochen markieren?`
                                      )
                                    ) {
                                      handleStatusUpdate(lead.id, "CANCELLED");
                                    }
                                  }}
                                >
                                  Abbrechen
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Leads</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Suchen..." className="w-64" />
                    <Button variant="outline" size="icon">
                      <Funnel className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayLeads.map((lead) => (
                    <Accordion type="single" collapsible key={lead.id}>
                      <AccordionItem value={`item-${lead.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                              <Badge variant={getStatusBadge(lead.status).variant}>
                                {getStatusBadge(lead.status).label}
                              </Badge>
                              <span className="font-semibold text-primary">
                                {lead.name}
                              </span>
                              <span className="text-sm text-foreground/60 truncate max-w-[200px]">
                                {lead.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-foreground/50">
                                {new Date(lead.createdAt).toLocaleDateString(
                                  "de-DE"
                                )}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-primary/5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusUpdate(lead.id, "COMPLETED");
                                }}
                                title="Als abgeschlossen markieren"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-foreground/60">
                                Kontaktdaten
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4" />
                                {lead.email}
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4" />
                                  {lead.phone}
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-foreground/60">
                                Konfiguration
                              </div>
                             <div className="text-sm">
                                 {((lead.calculationData?.quantity as number | undefined) ?? 0)} Stück •
                                 {(lead.calculationData?.size as string | undefined) ?? "-"} •
                                 {((lead.calculationData?.colors as number | undefined) ?? 0)} Farben
                               </div>
                               <div className="text-sm">
                                 Form: {(lead.calculationData?.shape as string | undefined) ?? "-"}
                               </div>
                               <div className="text-sm">
                                 Material: {(lead.calculationData?.material as string | undefined) ?? "-"}
                               </div>
                            </div>
                            {lead.message && (
                              <div className="md:col-span-2 space-y-2">
                                <div className="text-sm font-medium text-foreground/60">
                                  Nachricht
                                </div>
                                <div className="text-sm whitespace-pre-wrap">
                                  {lead.message}
                                </div>
                              </div>
                            )}
                            <div className="md:col-span-2 space-y-2">
                              <div className="text-sm font-medium text-foreground/60">
                                Status
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {lead.status !== "IN_PROGRESS" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusUpdate(lead.id, "IN_PROGRESS");
                                    }}
                                  >
                                    In Bearbeitung
                                  </Button>
                                )}
                                {lead.status !== "COMPLETED" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusUpdate(lead.id, "COMPLETED");
                                    }}
                                  >
                                    Abgeschlossen
                                  </Button>
                                )}
                                {lead.status !== "CANCELLED" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive border-destructive/20 hover:bg-destructive/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        confirm(
                                          `Möchten Sie "${lead.name}" wirklich als abgebrochen markieren?`
                                        )
                                      ) {
                                        handleStatusUpdate(lead.id, "CANCELLED");
                                      }
                                    }}
                                  >
                                    Abbrechen
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
         </Tabs>
       </div>
      </Suspense>
     </div>
   );
}
