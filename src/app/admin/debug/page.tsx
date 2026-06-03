"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CheckResult {
  status: "ok" | "error";
  message: string;
  detail?: string;
}

interface DebugReport {
  version: { version: string; buildTime: string | null };
  env: {
    nodeEnv: string;
    databaseUrl: CheckResult;
    sessionSecret: CheckResult;
    adminUser: string;
    siteUrl: string;
  };
  database: {
    connection: CheckResult | null;
    tables: CheckResult | null;
  };
}

function StatusBadge({ status }: { status: "ok" | "error" | "unknown" }) {
  if (status === "ok")
    return <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />;
  if (status === "error")
    return <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />;
}

function CheckRow({
  label,
  result,
}: {
  label: string;
  result: CheckResult | null;
}) {
  if (!result)
    return (
      <div className="flex items-start gap-3 py-2">
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground shrink-0 mt-0.5" />
        <span className="text-sm text-muted-foreground">{label}: Prüfe...</span>
      </div>
    );

  return (
    <div className="flex items-start gap-3 py-2">
      <StatusBadge status={result.status} />
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium">{label}</span>
        <span
          className={`text-sm ml-2 ${result.status === "ok" ? "text-green-700" : "text-red-700"}`}
        >
          {result.message}
        </span>
        {result.detail && (
          <pre className="mt-1 text-xs text-muted-foreground bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap break-all">
            {result.detail}
          </pre>
        )}
      </div>
    </div>
  );
}

export default function AdminDebugPage() {
  const [report, setReport] = useState<DebugReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/debug");
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      const data: DebugReport = await res.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const allOk =
    report &&
    report.database.connection?.status === "ok" &&
    report.database.tables?.status === "ok" &&
    report.env.sessionSecret.status === "ok";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">
            Debug
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Systemdiagnose und Fehleranalyse
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchReport}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Neu laden
        </Button>
      </div>

      {/* Overall Status */}
      {report && (
        <Card
          className={`border ${allOk ? "border-green-200" : "border-red-200"}`}
        >
          <CardContent className="p-4 flex items-center gap-3">
            {allOk ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-green-800">
                  Alle Systeme grün
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                <span className="text-sm font-medium text-red-800">
                  Es gibt Probleme — siehe Details unten
                </span>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="p-4">
            <pre className="text-sm text-red-700 whitespace-pre-wrap">
              {error}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && !report && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Version */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Version</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground">App-Version:</span>
              <span className="font-mono">{report.version.version}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Build-Zeit:</span>
              <span className="font-mono">
                {report.version.buildTime || "unbekannt"}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">
              Umgebungsvariablen
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <CheckRow label="DATABASE_URL" result={report.env.databaseUrl} />
            <CheckRow label="SESSION_SECRET" result={report.env.sessionSecret} />
            <div className="flex items-start gap-3 py-2">
              <StatusBadge
                status={report.env.adminUser ? "ok" : "error"}
              />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium">ADMIN_USER</span>
                <span className="text-sm text-green-700 ml-2">
                  {report.env.adminUser}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <span className="text-sm text-muted-foreground">NODE_ENV:</span>
              <span className="text-sm font-mono">{report.env.nodeEnv}</span>
            </div>
            <div className="flex items-start gap-3 py-2">
              <span className="text-sm text-muted-foreground">SITE_URL:</span>
              <span className="text-sm font-mono">{report.env.siteUrl}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Datenbank</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <CheckRow
              label="Verbindung"
              result={report.database.connection}
            />
            <CheckRow label="Tabellen" result={report.database.tables} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
