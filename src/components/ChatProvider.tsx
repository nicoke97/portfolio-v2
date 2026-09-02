"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { site } from "@/data/site";

type Message = { role: "assistant" | "user"; text: string };

type ChatContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages: Message[];
  send: (value: string) => void;
  reset: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const welcome: Message[] = [
  {
    role: "assistant",
    text: `Hey — I'm ${site.chatName}. Ask me about Nico's work, projects, or how to get in touch.`,
  },
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    return `Best email is ${site.email}. LinkedIn is ${site.linkedin}. He is based in ${site.location}.`;
  }
  if (q.includes("project") || q.includes("slab") || q.includes("falsify") || q.includes("python") || q.includes("rankine")) {
    return "SlabHQ is Pokémon TCG seller infrastructure, live in Mexico. Falsify is a Unity forgery tycoon aimed at January 2027. PythonOS is Kumon for Python. Rankine OS is a thesis bench for his brother's energy work.";
  }
  if (q.includes("work") || q.includes("solera") || q.includes("experience") || q.includes("job")) {
    return "Most recently Software Development Engineer II at Solera — .NET modernization, TFS to GitHub, 15+ microservices, mentoring, and client incidents. Before that SDE I, HPEL, Odoo support, and biomedical engineering at Star Médica.";
  }
  if (q.includes("stack") || q.includes("tech") || q.includes("language")) {
    return "Day-to-day: C#, .NET, TypeScript, React, Next.js, SQL. Also Python, Docker, Unity, Cursor, and GitHub Copilot. Spanish and English are native; Italian is conversational.";
  }
  if (q.includes("resume") || q.includes("cv")) {
    return "The resume is linked in the header — it downloads as a PDF.";
  }
  return `${site.name} is a ${site.title} in ${site.location}. Ask about work, projects, stack, or how to reach him.`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(welcome);

  const value = useMemo<ChatContextValue>(
    () => ({
      open,
      setOpen,
      messages,
      send: (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        setMessages((current) => [
          ...current,
          { role: "user", text: trimmed },
          { role: "assistant", text: reply(trimmed) },
        ]);
      },
      reset: () => setMessages(welcome),
    }),
    [open, messages],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
