"use client";

import { useState, type ReactNode } from "react";

export function HoverCaption({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="relative size-full cursor-none [&_img]:cursor-none"
      data-hide-pointer=""
      onPointerEnter={(event) => setPos({ x: event.clientX, y: event.clientY })}
      onPointerMove={(event) => setPos({ x: event.clientX, y: event.clientY })}
      onPointerLeave={() => setPos(null)}
    >
      {children}
      {pos ? (
        <span
          className="pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-1/2 bg-background px-3 py-2"
          style={{ left: pos.x, top: pos.y }}
        >
          <span
            className="font-serif text-[17px] leading-none text-foreground italic [box-decoration-break:clone]"
            style={{
              backgroundImage:
                "linear-gradient(transparent 42%, color-mix(in srgb, var(--primary) 28%, transparent) 42%, color-mix(in srgb, var(--primary) 28%, transparent) 90%, transparent 90%)",
            }}
          >
            {caption}
          </span>
        </span>
      ) : null}
    </div>
  );
}