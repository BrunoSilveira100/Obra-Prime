"use client";

import { useEffect, useState } from "react";
import { getData } from "@/services/storage";
import type { AppData } from "@/types/domain";

export function useAppData() {
  const [data, setData] = useState<AppData>(() => getData());

  useEffect(() => {
    const refresh = () => setData(getData());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("obra-prime-data", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("obra-prime-data", refresh);
    };
  }, []);

  return data;
}
