"use client";

import Script from "next/script";

export default function TidioChat() {
  const handleTidioLoad = () => {
    if (typeof window === "undefined") return;

    const api = (window as any).tidioChatApi;

    const hideWidget = () => {
      const tidioApi = (window as any).tidioChatApi;
      if (tidioApi) {
        // Hide the default floating bubble — we use our own trigger buttons
        tidioApi.hide();
      }
    };

    if (api) {
      // Already ready
      hideWidget();
    } else {
      // Wait for the tidioChat-ready event
      document.addEventListener("tidioChat-ready", hideWidget, { once: true });
    }
  };

  return (
    <Script
      src="https://code.tidio.co/aghxwormjr6xbxycjjfa5eydfxaiq85q.js"
      strategy="afterInteractive"
      onLoad={handleTidioLoad}
    />
  );
}
