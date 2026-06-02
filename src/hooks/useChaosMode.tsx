"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { getChaosCookie, setChaosCookie } from "@/src/lib/chaos-cookies";

const ChaosModeContext = createContext<boolean>(false);

export function ChaosModeProvider({ 
  children, 
  initialValue = false 
}: { 
  children: React.ReactNode,
  initialValue?: boolean
}) {
  const searchParams = useSearchParams();
  const [isEnabled, setIsEnabled] = useState(initialValue);

  // Sync on mount and searchParams change
  useEffect(() => {
    const chaosParam = searchParams.get("chaos");
    const currentCookie = getChaosCookie();

    if (chaosParam === "true") {
      setChaosCookie(true);
      setIsEnabled(true);
    } else if (chaosParam === "false") {
      setChaosCookie(false);
      setIsEnabled(false);
    } else {
      // Use existing cookie value
      setIsEnabled(currentCookie);
    }
  }, [searchParams]);

  return (
    <ChaosModeContext.Provider value={isEnabled}>
      {children}
    </ChaosModeContext.Provider>
  );
}

export function useChaosMode() {
  return useContext(ChaosModeContext);
}
