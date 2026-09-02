"use client";

import { useState } from "react";

export function DrawingCrop({ initialX = 26, initialY = 38, initialW = 465, initialH = 398 }) {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [w, setW] = useState(initialW);
  const [h, setH] = useState(initialH);

  const sliders = [
    { label: "Left (x)", value: x, set: setX, min: -50, max: 250 },
    { label: "Top (y)", value: y, set: setY, min: -50, max: 250 },
    { label: "Width (w)", value: w, set: setW, min: 100, max: 600 },
    { label: "Height (h)", value: h, set: setH, min: 100, max: 600 },
  ];

  return (
    <>
      <svg width="140" height="110" viewBox={`${x} ${y} ${w} ${h}`} aria-hidden="true">
        <defs>
          <filter id="colorize-nico">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.196
                      0 0 0 0 0.251
                      0 0 0 0 0.310
                     -0.333 -0.333 -0.333 1 0"
            />
          </filter>
        </defs>
        <image
          href="/projects/drawing/nicoke_no_bck.png"
          width="500"
          height="500"
          preserveAspectRatio="xMidYMid meet"
          filter="url(#colorize-nico)"
        />
      </svg>

      <div
        style={{ cursor: "auto" }}
        className="fixed bottom-4 right-4 z-[9999] w-72 rounded-xl border border-foreground/10 bg-background p-4 shadow-xl text-sm flex flex-col gap-3"
      >
        <p className="font-mono text-[11px] text-primary">
          viewBox: {x} {y} {w} {h}
        </p>
        {sliders.map(({ label, value, set, min, max }) => (
          <label key={label} className="flex flex-col gap-1" style={{ cursor: "auto" }}>
            <div className="flex justify-between">
              <span className="text-[12px] text-foreground-light">{label}</span>
              <span className="font-mono text-[12px]">{value}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              style={{ cursor: "ew-resize", width: "100%" }}
            />
          </label>
        ))}
        <p className="text-[11px] text-foreground-light">Dime los 4 valores cuando quede bien.</p>
      </div>
    </>
  );
}
