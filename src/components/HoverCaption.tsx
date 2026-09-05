"use client";

import { useEffect, useState, type ReactNode } from "react";

const CLOSE_EVENT = "hover-caption:close";

function CaptionBubble({ caption }: { caption: string }) {
  return (
    <span className="inline-block bg-background px-3 py-2 text-center">
      <span
        className="font-serif text-[17px] leading-snug text-foreground italic [box-decoration-break:clone]"
        style={{
          backgroundImage:
            "linear-gradient(transparent 42%, color-mix(in srgb, var(--primary) 28%, transparent) 42%, color-mix(in srgb, var(--primary) 28%, transparent) 90%, transparent 90%)",
        }}
      >
        {caption}
      </span>
    </span>
  );
}

export function HoverCaption({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isTouch) return;
    const close = () => setOpen(false);
    window.addEventListener(CLOSE_EVENT, close);
    return () => window.removeEventListener(CLOSE_EVENT, close);
  }, [isTouch]);

  useEffect(() => {
    if (!isTouch || !open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-hover-caption]")) return;
      window.dispatchEvent(new Event(CLOSE_EVENT));
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isTouch, open]);

  return (
    <div
      data-hover-caption=""
      role={isTouch ? "button" : undefined}
      tabIndex={isTouch ? 0 : undefined}
      aria-expanded={isTouch ? open : undefined}
      aria-label={isTouch ? caption : undefined}
      className={
        isTouch
          ? "relative size-full cursor-pointer select-none [-webkit-tap-highlight-color:transparent] [&_img]:pointer-events-none"
          : "relative size-full cursor-none [&_img]:cursor-none"
      }
      data-hide-pointer={isTouch ? undefined : ""}
      onClick={
        isTouch
          ? () => {
              if (open) {
                setOpen(false);
                return;
              }
              window.dispatchEvent(new Event(CLOSE_EVENT));
              setOpen(true);
            }
          : undefined
      }
      onPointerEnter={isTouch ? undefined : (event) => setPos({ x: event.clientX, y: event.clientY })}
      onPointerMove={isTouch ? undefined : (event) => setPos({ x: event.clientX, y: event.clientY })}
      onPointerLeave={isTouch ? undefined : () => setPos(null)}
    >
      {children}
      {isTouch ? (
        <span
          className={`absolute inset-0 bg-foreground/35 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
      {isTouch && open ? (
        <span className="pointer-events-none absolute top-1/2 left-1/2 z-[80] w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2">
          <CaptionBubble caption={caption} />
        </span>
      ) : null}
      {!isTouch && pos ? (
        <span
          className="pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y }}
        >
          <CaptionBubble caption={caption} />
        </span>
      ) : null}
    </div>
  );
}
