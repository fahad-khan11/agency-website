"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type PanelContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalPanels: number;
  setTotalPanels: (count: number) => void;
  navigateToPanel: (index: number) => void;
  registerGoToPanel: (fn: (index: number) => void) => void;
};

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPanels, setTotalPanels] = useState(0);
  const [goToPanelFn, setGoToPanelFn] = useState<((index: number) => void) | null>(null);

  const registerGoToPanel = useCallback((fn: (index: number) => void) => {
    setGoToPanelFn(() => fn);
  }, []);

  const navigateToPanel = useCallback((index: number) => {
    if (goToPanelFn) {
      goToPanelFn(index);
    } else {
      console.warn("Panel navigation requested but no handler registered (not on home page?)");
      // Fallback: if we used IDs, we could try to scroll native?
      // But for this specific "Panel Takeover", we really need the GSAP function.
    }
  }, [goToPanelFn]);

  return (
    <PanelContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        totalPanels,
        setTotalPanels,
        navigateToPanel,
        registerGoToPanel,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
}
