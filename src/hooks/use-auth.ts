"use client";

import { useEffect, useState } from "react";
import { getSession, setSession } from "@/services/storage";
import type { Session } from "@/types/domain";

export function useAuth() {
  const [session, setCurrentSession] = useState<Session | null>(() => getSession());

  useEffect(() => {
    const refresh = () => setCurrentSession(getSession());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("obra-prime-session", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("obra-prime-session", refresh);
    };
  }, []);

  function logout() {
    setSession(null);
    setCurrentSession(null);
  }

  return { session, logout };
}
