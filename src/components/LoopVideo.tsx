"use client";

import { useRef } from "react";

export function LoopVideo({
  src,
  poster,
  trimStart = 0,
  trimEnd = 0,
  preload = "metadata",
  className,
}: {
  src: string;
  poster?: string;
  trimStart?: number;
  trimEnd?: number;
  preload?: "auto" | "metadata" | "none";
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function seekToStart() {
    const video = videoRef.current;
    if (video) video.currentTime = trimStart;
  }

  function keepInRange() {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    const end = Math.max(trimStart + 0.05, video.duration - trimEnd);
    if (video.currentTime < trimStart) {
      video.currentTime = trimStart;
    }
    if (video.currentTime >= end) {
      video.currentTime = end;
      video.pause();
    }
  }

  return (
    <video
      ref={videoRef}
      src={encodeURI(src)}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload={preload}
      className={className}
      onLoadedMetadata={seekToStart}
      onTimeUpdate={keepInRange}
    />
  );
}
