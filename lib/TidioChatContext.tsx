"use client";

import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from "react";

interface TidioChatContextValue {
  openTidioChat: () => void;
  isOpen: boolean;
}

const TidioChatContext = createContext<TidioChatContextValue>({
  openTidioChat: () => { },
  isOpen: false,
});

export function TidioChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openTidioChat = useCallback(() => {
    if (typeof window === "undefined") return;

    const api = (window as any).tidioChatApi;
    if (api) {
      api.show();
      api.open();
    } else {
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

  useEffect(() => {
    const handleEvents = () => {
      const api = (window as any).tidioChatApi;
      if (api) {
        api.on("open", () => setIsOpen(true));
        api.on("close", () => setIsOpen(false));
      }
    };

    if ((window as any).tidioChatApi) {
      handleEvents();
    } else {
      document.addEventListener("tidioChat-ready", handleEvents, { once: true });
    }

    return () => {
      // Tidio API doesn't always have off(), but we can try to clean up if needed
      // Most Tidio implementations don't require explicit cleanup of these event listeners
    };
  }, []);

  return (
    <TidioChatContext.Provider value={{ openTidioChat, isOpen }}>
      {children}
    </TidioChatContext.Provider>
  );
}

export function useTidioChat() {
  return useContext(TidioChatContext);
}
