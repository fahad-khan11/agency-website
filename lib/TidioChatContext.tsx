"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";

interface TidioChatContextValue {
  openTidioChat: () => void;
}

const TidioChatContext = createContext<TidioChatContextValue>({
  openTidioChat: () => {},
});

export function TidioChatProvider({ children }: { children: ReactNode }) {
  const openTidioChat = useCallback(() => {
    if (typeof window === "undefined") return;

    const api = (window as any).tidioChatApi;
    if (api) {
      api.show();
      api.open();
    } else {
      // Tidio not yet loaded — wait for it
      const onReady = () => {
        const readyApi = (window as any).tidioChatApi;
        if (readyApi) {
          readyApi.show();
          readyApi.open();
        }
        document.removeEventListener("tidioChat-ready", onReady);
      };
      document.addEventListener("tidioChat-ready", onReady);
    }
  }, []);

  return (
    <TidioChatContext.Provider value={{ openTidioChat }}>
      {children}
    </TidioChatContext.Provider>
  );
}

export function useTidioChat() {
  return useContext(TidioChatContext);
}
