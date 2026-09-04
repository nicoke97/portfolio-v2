"use client";

import { useEffect, useRef, useState } from "react";

export function NicoName() {
  const [played, setPlayed] = useState(false);
  const [auto, setAuto] = useState(false);
  const stopTimer = useRef<number>(0);
  const intervalId = useRef<number>(0);

  useEffect(() => {
    if (played) return;

    const run = () => {
      setAuto(true);
      window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => setAuto(false), 1100);
    };

    const first = window.setTimeout(() => {
      run();
      intervalId.current = window.setInterval(run, 6000);
    }, 3500);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(intervalId.current);
      window.clearTimeout(stopTimer.current);
    };
  }, [played]);

  return (
    <span
      className={`group relative inline-block ${auto ? "nico-auto" : ""}`}
      onMouseEnter={() => {
        setPlayed(true);
        setAuto(false);
      }}
    >
      <svg
        viewBox="37 52 461 371"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-0 w-[120%] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <defs>
          <filter id="colorize-nico-hover">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.745 0 0 0 0 0.439 0 0 0 0 0.298 -0.333 -0.333 -0.333 1 0"
            />
          </filter>
        </defs>
        <image
          href="/projects/drawing/nicoke_no_bck.png"
          width="500"
          height="500"
          preserveAspectRatio="xMidYMid meet"
          filter="url(#colorize-nico-hover)"
        />
      </svg>
      <span className="inline-flex transition-colors duration-200 group-hover:text-primary">
        <span className="nico-n inline-block">N</span>
        <span className="nico-i inline-block">i</span>
        <span className="nico-c inline-block">c</span>
        <span className="nico-o inline-block">o</span>
      </span>
    </span>
  );
}
