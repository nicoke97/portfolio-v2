"use client";

import { useEffect, useRef } from "react";

const SCALE = 2;
const SIZE = 32 * SCALE;
const HALF = SIZE / 2;
const SPEED = 14;
const STOP = 64;
const PAD = 24;
const FRAME_MS = 100;

const SPRITES: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function OnekoPlayground() {
  const areaRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const cat = catRef.current;
    if (!area || !cat) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sheet = `${8 * SIZE}px ${4 * SIZE}px`;

    cat.style.width = `${SIZE}px`;
    cat.style.height = `${SIZE}px`;
    cat.style.maskImage = "url(/oneko/oneko.gif)";
    cat.style.webkitMaskImage = "url(/oneko/oneko.gif)";
    cat.style.maskSize = sheet;
    cat.style.webkitMaskSize = sheet;
    cat.style.maskRepeat = "no-repeat";
    cat.style.webkitMaskRepeat = "no-repeat";
    cat.style.imageRendering = "pixelated";

    const setSprite = (name: string, frame: number) => {
      const frames = SPRITES[name];
      if (!frames) return;
      const sprite = frames[frame % frames.length];
      const pos = `${sprite[0] * SIZE}px ${sprite[1] * SIZE}px`;
      cat.style.maskPosition = pos;
      cat.style.webkitMaskPosition = pos;
    };

    const bounds = () => {
      const width = area.clientWidth;
      const height = area.clientHeight;
      const minX = Math.min(HALF + PAD, width / 2);
      const minY = Math.min(HALF + PAD, height / 2);
      return {
        minX,
        minY,
        maxX: Math.max(minX, width - HALF - PAD),
        maxY: Math.max(minY, height - HALF - PAD - 36),
      };
    };

    const place = (x: number, y: number) => {
      cat.style.left = `${x - HALF}px`;
      cat.style.top = `${y - HALF}px`;
    };

    let box = bounds();
    let nekoX = box.minX + (box.maxX - box.minX) * 0.28;
    let nekoY = box.minY + (box.maxY - box.minY) * 0.55;
    let mouseX = nekoX;
    let mouseY = nekoY;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = "sleeping";
    let idleAnimationFrame = 8;
    let lastFrame = 0;
    let raf = 0;
    let running = true;
    let asleep = true;

    place(nekoX, nekoY);
    setSprite("sleeping", 0);

    const resetIdle = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const idle = () => {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const options = ["sleeping", "scratchSelf"];
        if (nekoX <= box.minX + 2) options.push("scratchWallW");
        if (nekoY <= box.minY + 2) options.push("scratchWallN");
        if (nekoX >= box.maxX - 2) options.push("scratchWallE");
        if (nekoY >= box.maxY - 2) options.push("scratchWallS");
        idleAnimation = options[Math.floor(Math.random() * options.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdle();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdle();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const stayAsleep = () => {
      if (idleAnimationFrame < 8) setSprite("tired", 0);
      else setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
      idleAnimationFrame += 1;
    };

    const frame = () => {
      frameCount += 1;
      box = bounds();
      nekoX = clamp(nekoX, box.minX, box.maxX);
      nekoY = clamp(nekoY, box.minY, box.maxY);

      if (asleep) {
        stayAsleep();
        place(nekoX, nekoY);
        return;
      }

      const targetX = clamp(mouseX, box.minX, box.maxX);
      const targetY = clamp(mouseY, box.minY, box.maxY);
      const diffX = nekoX - targetX;
      const diffY = nekoY - targetY;
      const distance = Math.hypot(diffX, diffY);

      if (distance < STOP) {
        idle();
        place(nekoX, nekoY);
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        place(nekoX, nekoY);
        return;
      }

      let direction = diffY / distance > 0.35 ? "N" : "";
      direction += diffY / distance < -0.35 ? "S" : "";
      direction += diffX / distance > 0.35 ? "W" : "";
      direction += diffX / distance < -0.35 ? "E" : "";
      setSprite(direction || "idle", frameCount);

      const step = Math.min(SPEED, distance);
      nekoX = clamp(nekoX - (diffX / distance) * step, box.minX, box.maxX);
      nekoY = clamp(nekoY - (diffY / distance) * step, box.minY, box.maxY);
      place(nekoX, nekoY);
    };

    const onMove = (event: MouseEvent) => {
      if (asleep) return;
      const rect = area.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const toggleSleep = () => {
      if (reduced) return;
      asleep = !asleep;
      idleTime = 0;
      if (asleep) {
        idleAnimation = "sleeping";
        idleAnimationFrame = 0;
        cat.setAttribute("aria-label", "Wake Tomi");
        cat.setAttribute("title", "Click to wake");
        return;
      }
      resetIdle();
      cat.setAttribute("aria-label", "Put Tomi to sleep");
      cat.setAttribute("title", "Click to sleep");
    };

    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSleep();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleSleep();
    };

    const onAnimationFrame = (timestamp: number) => {
      if (!running) return;
      if (!lastFrame) lastFrame = timestamp;
      if (timestamp - lastFrame > FRAME_MS) {
        lastFrame = timestamp;
        frame();
      }
      raf = window.requestAnimationFrame(onAnimationFrame);
    };

    document.addEventListener("mousemove", onMove);
    cat.addEventListener("click", onClick);
    cat.addEventListener("keydown", onKey);
    raf = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      cat.removeEventListener("click", onClick);
      cat.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative hidden min-h-[20rem] self-stretch lg:block">
      <div ref={areaRef} className="absolute inset-0 overflow-hidden bg-[#f3eee8]">
        <button
          ref={catRef}
          type="button"
          aria-label="Wake Tomi"
          title="Click to wake"
          className="absolute appearance-none border-0 bg-foreground p-0 outline-none transition-colors duration-200 hover:bg-primary focus-visible:bg-primary"
          style={{
            cursor: "inherit",
            width: SIZE,
            height: SIZE,
            left: "22%",
            top: "42%",
            imageRendering: "pixelated",
            maskImage: "url(/oneko/oneko.gif)",
            WebkitMaskImage: "url(/oneko/oneko.gif)",
            maskSize: `${8 * SIZE}px ${4 * SIZE}px`,
            WebkitMaskSize: `${8 * SIZE}px ${4 * SIZE}px`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: `${-2 * SIZE}px 0px`,
            WebkitMaskPosition: `${-2 * SIZE}px 0px`,
          }}
        />
        <p className="pointer-events-none absolute right-4 bottom-3 max-w-[20rem] text-right font-serif text-[14px] leading-snug text-foreground-light italic">
          you can play with tomi, don&apos;t be shy, just click him.
        </p>
      </div>
    </div>
  );
}
