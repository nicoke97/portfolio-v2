"use client";

import { Menu, X } from "lucide-react";
// import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { getProject, site } from "@/data/site";

// import { useChat } from "./ChatProvider";

const nav = [
  { href: "/", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "About Me" },
];

export function Header() {
  const pathname = usePathname();
  // const { open, setOpen } = useChat();
  const [menuOpen, setMenuOpen] = useState(false);
  const brandTaps = useRef(0);
  const brandTimer = useRef<number>(0);

  const projectPage = pathname.startsWith("/projects/")
    ? getProject(pathname.replace("/projects/", "").split("/")[0] ?? "")?.page
    : undefined;
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || projectPage === "work";
    if (href === "/projects") return pathname === "/projects" || projectPage === "fun";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-foreground/10 relative z-50 flex min-h-[32px] items-center justify-center gap-6 border-b bg-background px-6 py-5 lg:h-16">
      <div className="relative flex w-full max-w-[1800px] items-center gap-6">
        <div className="flex w-full items-center">
          <Link
            href="/"
            className="group inline-flex cursor-pointer flex-row items-center gap-4 !opacity-100"
            data-cursor="home"
            data-easter="slab"
            onClick={(event) => {
              brandTaps.current += 1;
              window.clearTimeout(brandTimer.current);
              if (brandTaps.current >= 3) {
                event.preventDefault();
                brandTaps.current = 0;
                return;
              }
              brandTimer.current = window.setTimeout(() => {
                brandTaps.current = 0;
              }, 700);
            }}
          >
            <h4 className="!font-medium !text-foreground !opacity-100 transition-colors duration-300 group-hover:!text-primary">{site.name}</h4>
            <h4 className="flex items-center gap-0 transition-colors duration-300 group-hover:!text-primary">{site.title}</h4>
          </Link>
        </div>

        <div className="hidden w-full items-center justify-end gap-8 md:flex">
          <div className="flex items-center gap-12">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap text-left !opacity-100" data-cursor="go">
                <h4 className={isActive(item.href) ? "!text-primary !opacity-100" : "hover:!text-primary !opacity-100"}>
                  {item.label}
                </h4>
              </Link>
            ))}
            <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className="hover:!opacity-100" data-cursor="resume">
              <h4 className="hover:!text-primary cursor-pointer">CV</h4>
            </a>
          </div>
          {/* NicoGPT — hidden for now
          <div className="flex items-center justify-end gap-2 lg:w-full">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="group mr-[-8px] flex h-8 w-auto items-center rounded-full p-2 opacity-50 transition-all duration-200 hover:text-primary hover:opacity-100"
              aria-label={open ? "Close AI chat" : "Open AI chat"}
              data-cursor="chat"
            >
              <MessageCircle className="mr-1.5 size-3.5" />
              <h4 className="!text-inherit">{site.chatName}</h4>
            </button>
          </div>
          */}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {/* NicoGPT — hidden for now
          <button type="button" onClick={() => setOpen(!open)} aria-label="Open AI chat" className="opacity-60">
            <MessageCircle className="size-4" />
          </button>
          */}
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full right-0 left-0 z-60 border-b border-foreground/10 bg-background p-6 transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <h4 className={isActive(item.href) ? "!text-primary" : ""}>{item.label}</h4>
            </Link>
          ))}
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer">
            <h4>CV</h4>
          </a>
          {/* <p className="text-foreground-light text-xs">{site.chatName} is in the chat bubble.</p> */}
        </div>
      </div>
    </header>
  );
}
