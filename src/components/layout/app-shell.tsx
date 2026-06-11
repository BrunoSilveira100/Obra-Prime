"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, BarChart3, Building2, Camera, FileText, LogOut, Menu, Moon, Sun, Users, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/obras", label: "Obras", icon: Building2 },
  { href: "/ordens-servico", label: "Ordens de Servico", icon: Wrench },
  { href: "/fotos", label: "Fotos", icon: Camera },
  { href: "/relatorios", label: "Relatorios", icon: FileText },
  { href: "/usuarios", label: "Usuarios", icon: Users },
  { href: "/historico", label: "Historico", icon: Activity }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("obra-prime-theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  useEffect(() => {
    if (mounted && !session) router.replace("/login");
  }, [mounted, router, session]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("obra-prime-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (!mounted || !session) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Carregando sessao...</div>;
  }

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r bg-card">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">OP</span>
          <span>Obra Prime</span>
        </Link>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted",
                active && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3 text-xs text-muted-foreground">
        <p>{session.user.name}</p>
        <p>{session.user.role}</p>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex">{sidebar}</div>
      {open ? <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} /> : null}
      <div className={cn("fixed inset-y-0 left-0 z-50 transform transition lg:hidden", open ? "translate-x-0" : "-translate-x-full")}>{sidebar}</div>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Gestao operacional</p>
              <p className="font-semibold">Obra Prime Web</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
