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
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  calculationData: any;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export default function AdminDashboard() {
  // Mock data - replace with actual API call
  const leads: Lead[] = [
    {
      id: "1",
      createdAt: "2024-01-15T10:30:00Z",
      name: "Max Mustermann",
      email: "max@beispiel.de",
      phone: "+49 123 456789",
      message: "Brauche Patches für mein Startup",
      calculationData: {
        shape: "circle",
        size: "medium",
        complexity: "medium",
        backing: "iron",
        material: "twill",
        colors: 4,
        quantity: 50,
      },
      status: "NEW",
    },
    {
      id: "2",
      createdAt: "2024-01-14T14:20:00Z",
      name: "Anna Schmidt",
      email: "anna@firma.de",
      phone: "+49 987 654321",
      message: "Personalisierte Patches für Team",
      calculationData: {
        shape: "rectangle",
        size: "small",
        complexity: "low",
        backing: "sewn",
        material: "reflective",
        colors: 2,
        quantity: 100,
      },
      status: "IN_PROGRESS",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "accent" | "secondary" | "outline" }> = {
      NEW: { label: "Neu", variant: "default" },
      IN_PROGRESS: { label: "In Bearbeitung", variant: "accent" },
      COMPLETED: { label: "Abgeschlossen", variant: "secondary" },
      CANCELLED: { label: "Abgebrochen", variant: "outline" },
    };
    return variants[status] || { label: status, variant: "outline" };
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    inProgress: leads.filter((l) => l.status === "IN_PROGRESS").length,
    completed: leads.filter((l) => l.status === "COMPLETED").length,
  };

  return (
    <div className="min-h-screen bg-background p-8">
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
          <Button variant="accent" size="lg">
            + Neuer Lead
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Gesamt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Neue Anfragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.new}</div>
            </CardContent>
          </Card>
          <Card>
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
          <Card>
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
                          {leads.filter((l) => l.status === status).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 space-y-3 flex-1">
                      {leads
                        .filter((l) => l.status === status)
                        .map((lead) => (
                          <div
                            key={lead.id}
                            className="p-4 bg-muted rounded-lg border cursor-pointer hover:bg-muted/80 transition-colors"
                          >
                            <div className="font-semibold text-primary mb-2">
                              {lead.name}
                            </div>
                            <div className="text-xs text-foreground/60 space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                {lead.email}
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {lead.phone}
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {new Date(lead.createdAt).toLocaleDateString("de-DE")}
                              </div>
                              <div className="font-medium text-accent">
                                {lead.calculationData.quantity} Stück
                              </div>
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
                  {leads.map((lead) => (
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
                              <span className="text-sm text-foreground/60">
                                {lead.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Clock className="w-4 h-4" />
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
                                {lead.calculationData.quantity} Stück •{" "}
                                {lead.calculationData.size} •{" "}
                                {lead.calculationData.colors} Farben
                              </div>
                            </div>
                            {lead.message && (
                              <div className="md:col-span-2 space-y-2">
                                <div className="text-sm font-medium text-foreground/60">
                                  Nachricht
                                </div>
                                <div className="text-sm">{lead.message}</div>
                              </div>
                            )}
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
    </div>
  );
}
