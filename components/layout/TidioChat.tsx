"use client";

import Script from "next/script";

export default function TidioChat() {
  const handleTidioLoad = () => {
    if (typeof window === "undefined") return;

    const api = (window as any).tidioChatApi;

    const configureWidget = () => {
      const tidioApi = (window as any).tidioChatApi;
      if (tidioApi) {
        // We no longer hide the widget as we want the default "black" Tidio button
        tidioApi.show();
      }
    };

    if (api) {
      configureWidget();
    } else {
      document.addEventListener("tidioChat-ready", configureWidget, { once: true });
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
