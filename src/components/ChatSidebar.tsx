"use client";

import { RotateCcw, Send, X } from "lucide-react";
import { useState } from "react";

import { site } from "@/data/site";

import { useChat } from "./ChatProvider";

const starters = [
  "What projects have you worked on?",
  "What's the story behind SlabHQ?",
  "How can I get in touch?",
];

export function ChatSidebar() {
  const { open, setOpen, messages, send, reset } = useChat();
  const [text, setText] = useState("");
  const started = messages.some((message) => message.role === "user");

  if (!open) return null;

  const onSend = () => {
    send(text);
    setText("");
  };

  return (
    <aside className="border-foreground/10 flex h-full w-full shrink-0 flex-col overflow-hidden border-l bg-background md:w-96">
      <div className="relative z-10 flex flex-shrink-0 items-center justify-between overflow-visible p-4 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-foreground/10 after:content-['']">
        <h4 className="!text-[15px] !font-medium !text-foreground">{site.chatName}</h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            aria-label="Reset chat"
            className="flex size-7 items-center justify-center rounded-full transition-all duration-200 hover:bg-foreground/10 hover:opacity-50"
            data-cursor="reset"
          >
            <RotateCcw className="size-[15px]" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI chat"
            className="flex size-7 items-center justify-center rounded-full transition-all duration-200 hover:bg-foreground/10 hover:opacity-50"
            data-cursor="close"
          >
            <X className="size-[15px]" />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        {!started ? (
          <div className="mt-auto flex flex-col justify-end space-y-4">
            <h3 className="font-serif text-[24px] font-medium">What would you like to know?</h3>
            <div className="flex flex-col items-start gap-2">
              {starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => send(starter)}
                  className="border-foreground/10 rounded-full border px-3 py-1.5 text-left text-sm text-foreground-light transition-colors hover:border-primary hover:text-primary"
                  data-cursor="ask"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === "user" ? "self-end max-w-[85%] rounded-2xl bg-foreground/5 px-3 py-2 text-sm" : "max-w-[92%] text-sm leading-relaxed text-foreground"}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <form
        className="border-foreground/10 flex items-center gap-2 border-t p-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={`Ask about ${site.shortName}...`}
          className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-light"
          aria-label={`Ask about ${site.shortName}`}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          className="text-primary disabled:opacity-30"
          data-cursor="send"
        >
          <Send className="size-4" />
        </button>
      </form>
    </aside>
  );
}
