import Image from "next/image";
import Link from "next/link";

import { HoverCaption } from "@/components/HoverCaption";
import { about, site } from "@/data/site";

function isUnoptimized(src: string) {
  return src.endsWith(".jfif") || src === "/portrait.png";
}

/** On mobile the grid is 2-col. In each pair (row), the photo with the
 *  larger aspect ratio is shorter at equal column widths and should be
 *  bottom-aligned so all four central corners meet.
 *  Only applies to non-last rows — the last row has nothing below it,
 *  so floating photos to the bottom there just creates ugly top gaps. */
function isShorterInRow(
  images: { width: number; height: number }[],
  index: number,
): boolean {
  const totalRows = Math.ceil(images.length / 2);
  const row = Math.floor(index / 2);
  // Last row: leave both photos top-aligned
  if (row >= totalRows - 1) return false;
  const leftIdx = row * 2;
  const rightIdx = leftIdx + 1;
  if (rightIdx >= images.length) return false;
  const leftRatio = images[leftIdx].width / images[leftIdx].height;
  const rightRatio = images[rightIdx].width / images[rightIdx].height;
  if (leftRatio > rightRatio) return index === leftIdx;
  if (rightRatio > leftRatio) return index === rightIdx;
  return false;
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-20">
      <section className="grid grid-cols-1 gap-12 pt-8 lg:grid-cols-2">
        <h1 className="max-w-xl text-[36px] leading-[1.12] tracking-[-0.02em] md:text-[48px] md:leading-[1.15]">
          I love traveling,
          <br />
          and making complicated
          <br />
          things feel <span className="italic">simple</span>
        </h1>
        <div className="max-w-xl space-y-5 text-[16px] leading-relaxed text-foreground-light">
          <p>{about.lede}</p>
          <p>
            {about.open}
            <br />
            <Link href={`mailto:${site.email}`} className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:text-primary" data-cursor="chat">
              let&apos;s chat!
            </Link>
          </p>
        </div>
      </section>

      <section className="mt-20 space-y-14 md:mt-28 md:space-y-20">
        {about.personas.map((persona) => (
          <figure key={persona.id} className="min-w-0">
            <h4 className="mb-5 font-mono text-[12px] font-normal tracking-[0.08em]">
              {persona.id}. {persona.label}
            </h4>
            <div
              className="grid grid-cols-2 items-start gap-2 lg:grid-cols-[var(--photo-cols)] lg:items-stretch lg:gap-3"
              style={{
                ["--photo-cols" as string]: persona.images
                  .map((image) => `${image.width / image.height}fr`)
                  .join(" "),
              }}
            >
              {persona.images.map((image, index) => (
                <div
                  key={image.src}
                  className="relative min-w-0 overflow-hidden"
                  data-short={isShorterInRow(persona.images, index) || undefined}
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                    background: persona.tone,
                  }}
                >
                  <HoverCaption caption={image.caption}>
                    <Image
                      src={image.src}
                      alt={image.caption}
                      fill
                      unoptimized={isUnoptimized(image.src)}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover cursor-none"
                      style={{ objectPosition: image.position }}
                    />
                  </HoverCaption>
                </div>
              ))}
            </div>
          </figure>
        ))}
      </section>
    </div>
  );
}
