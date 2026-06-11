"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/utils/cn";

type ToastType = "success" | "error" | "info";
type Toast = { id: string; title: string; description?: string; type: ToastType };
type ToastContextValue = { toast: (toast: Omit<Toast, "id">) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      toast: (toast: Omit<Toast, "id">) => {
        const id = String(Date.now());
        setItems((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3200);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {items.map((item) => {
          const Icon = item.type === "success" ? CheckCircle2 : item.type === "error" ? XCircle : Info;
          return (
            <div key={item.id} className="rounded-lg border bg-card p-4 text-card-foreground shadow-lg">
              <div className="flex gap-3">
                <Icon className={cn("mt-0.5 h-5 w-5", item.type === "success" && "text-primary", item.type === "error" && "text-destructive")} />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  {item.description ? <p className="mt-1 text-sm text-muted-foreground">{item.description}</p> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
