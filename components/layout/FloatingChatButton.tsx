"use client";

import { MessageCircle } from "lucide-react";
import { useTidioChat } from "@/lib/TidioChatContext";
import clsx from "clsx";

export default function FloatingChatButton() {
  const { openTidioChat, isOpen } = useTidioChat();

  return (
    <button
      id="floating-chat-btn"
      onClick={openTidioChat}
      aria-label="Open live chat"
      className={clsx(
        "fixed bottom-6 right-6 z-[200] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group",
        isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
      )}
      style={{
        background: "linear-gradient(135deg, #00B4D9 0%, #0077a8 100%)",
        boxShadow: "0 0 30px rgba(0, 180, 217, 0.4), 0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <MessageCircle
        className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110"
        strokeWidth={2}
      />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#00B4D9]" />
    </button>
  );
}
