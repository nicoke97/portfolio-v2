import Image from "next/image";

import { LoopVideo } from "@/components/LoopVideo";
import type { ProjectMedia as ProjectMediaItem } from "@/data/site";

export function ProjectMedia({
  media,
  priority = false,
  compact = false,
  small = false,
}: {
  media: ProjectMediaItem;
  priority?: boolean;
  compact?: boolean;
  small?: boolean;
}) {
  return (
    <figure className={small ? "mt-8 max-w-2xl" : compact ? "mt-8 max-w-3xl" : "mt-8"}>
      <div
        className={
          media.kind === "video"
            ? media.fit === "contain"
              ? "relative flex h-[280px] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#111814] md:h-[320px]"
              : `relative ${media.aspect ?? "aspect-video"} overflow-hidden bg-[#111814]`
            : "overflow-hidden bg-[#111814]"
        }
        style={media.background ? { background: media.background } : undefined}
      >
        {media.kind === "video" ? (
          media.trimStart || media.trimEnd ? (
            <LoopVideo
              src={media.src}
              poster={media.poster}
              trimStart={media.trimStart}
              trimEnd={media.trimEnd}
              preload={priority ? "auto" : "metadata"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <video
                src={encodeURI(media.src)}
                poster={media.poster}
                autoPlay
                muted
                playsInline
                preload={priority ? "auto" : "metadata"}
                className={
                  media.fit === "contain"
                    ? "h-28 w-auto object-contain md:h-32"
                    : "absolute inset-0 h-full w-full object-cover"
                }
              />
              {media.fit === "contain" && media.label ? (
                <p className="px-6 text-center text-3xl font-medium tracking-tight text-white drop-shadow-sm md:text-5xl">
                  {media.label}
                </p>
              ) : null}
            </>
          )
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            width={1600}
            height={900}
            priority={priority}
            sizes="80vw"
            className="h-auto w-full"
          />
        )}
      </div>
      {media.caption ? (
        <figcaption className="mt-3">
          <h4>{media.caption}</h4>
        </figcaption>
      ) : null}
    </figure>
  );
}
