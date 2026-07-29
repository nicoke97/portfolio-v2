"use client";

import { useEffect, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  label: string;
  visible: boolean;
};

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: "",
    visible: false,
  });
  const [slabMode, setSlabMode] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let taps = 0;
    let timer: number | undefined;

    const onMove = (event: MouseEvent) => {
      const hidePointer = Boolean((event.target as HTMLElement | null)?.closest("[data-hide-pointer]"));
      const target = (event.target as HTMLElement | null)?.closest("[data-cursor]");
      const label = hidePointer ? "" : (target?.getAttribute("data-cursor") ?? "");
      setCursor({
        x: event.clientX,
        y: event.clientY,
        label,
        visible: !hidePointer,
      });
    };

    const onLeave = () => setCursor((current) => ({ ...current, visible: false }));

    const onClick = (event: MouseEvent) => {
      const origin = (event.target as HTMLElement | null)?.closest("[data-easter='slab']");
      if (!origin) {
        taps = 0;
        return;
      }
      taps += 1;
      window.clearTimeout(timer);
      if (taps >= 3) {
        taps = 0;
        setSlabMode((current) => !current);
        return;
      }
      timer = window.setTimeout(() => {
        taps = 0;
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(timer);
    };
  }, []);

  const expanded = Boolean(cursor.label);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden items-center gap-1.5 md:flex"
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`,
        opacity: cursor.visible ? 1 : 0,
      }}
    >
      {slabMode ? (
        <span className="relative block size-4 shrink-0 overflow-hidden rounded-full border border-black/80 shadow-sm">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[#ee1515]" />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f7f7f7]" />
          <span className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 bg-black" />
          <span className="absolute top-1/2 left-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-black bg-white" />
        </span>
      ) : null}

      <div
        className="flex items-center justify-center overflow-hidden whitespace-nowrap text-white"
        style={{
          background: slabMode && !expanded ? "transparent" : "var(--primary)",
          borderRadius: 999,
          height: expanded ? 28 : slabMode ? 0 : 16,
          minWidth: expanded ? 28 : slabMode ? 0 : 16,
          padding: expanded ? "0 10px" : 0,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: expanded ? "0 8px 20px rgba(79, 110, 182, 0.28)" : "none",
          transition:
            "width 0.2s ease-out, height 0.2s ease-out, min-width 0.2s ease-out, padding 0.2s ease-out, box-shadow 0.2s ease-out",
        }}
      >
        {expanded ? cursor.label : null}
      </div>
    </div>
  );
}
