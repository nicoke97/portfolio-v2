"use client";

import type { ReactNode } from "react";

import { ChatSidebar } from "./ChatSidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useChat } from "./ChatProvider";

export function Shell({ children }: { children: ReactNode }) {
  const { open } = useChat();

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <div
        className={`flex-1 transition-all duration-200 ease-in-out ${
          open ? "overflow-hidden md:overflow-y-auto" : "overflow-y-auto"
        }`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
      <ChatSidebar />
    </div>
  );
}
