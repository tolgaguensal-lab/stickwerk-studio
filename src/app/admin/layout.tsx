"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/leads",
    label: "Anfragen",
    icon: Inbox,
    exact: false,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<{
    email: string;
    role: string;
  } | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // If we're on the login page, render children without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Fetch session info on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated) {
          setSession(data.user);
        }
      })
      .catch(() => {
        // Not authenticated — middleware will redirect
      })
      .finally(() => setSessionLoading(false));

    fetch("/api/version")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.version) setAppVersion(data.version);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      // silent
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (link: { href: string; exact: boolean }) => {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-border">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/brand/logo-mark.svg"
                alt="Stickwerk-Studio"
                width={28}
                height={28}
              />
              <div>
                <span className="text-sm font-serif font-bold text-foreground block leading-tight">
                  Stickwerk-Studio
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sidebar schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-4 border-t border-border space-y-1">
            {/* User info */}
            {!sessionLoading && session && (
              <div className="px-3 py-2 mb-1">
                <p className="text-xs text-muted-foreground truncate">
                  {session.email}
                </p>
                <span className="text-[10px] uppercase tracking-wider text-accent">
                  {session.role === "admin" ? "Administrator" : "Betrachter"}
                </span>
              </div>
            )}

            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5 shrink-0" />
              <span>Zur Website</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut || sessionLoading}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200 w-full disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 shrink-0" />
              )}
              <span>Logout</span>
            </button>

            {/* App Version */}
            {appVersion && (
              <div className="px-3 pt-2">
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider text-center">
                  v{appVersion}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar (mobile) */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border lg:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menü öffnen"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/brand/logo-mark.svg"
                alt="Stickwerk-Studio"
                width={24}
                height={24}
              />
              <span className="text-sm font-serif font-bold text-foreground">
                Admin
              </span>
            </Link>
            <div className="w-5" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
