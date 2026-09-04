import Image from "next/image";
import Link from "next/link";

import { about, site } from "@/data/site";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-20">
      <section className="grid grid-cols-1 gap-12 pt-8 lg:grid-cols-2">
        <h1 className="max-w-xl text-[36px] leading-[1.12] tracking-[-0.02em] md:text-[48px] md:leading-[1.15]">
          I love traveling, photography,
          <br />
          and making complicated things feel <span className="font-bold italic">simple</span>.
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

      <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {about.personas.map((persona) => (
          <figure key={persona.id} className="flex flex-col gap-3">
            <div className="relative aspect-[4/5] overflow-hidden" style={{ background: persona.tone ?? "#efe8df" }}>
              {persona.image ? (
                <Image src={persona.image} alt={persona.label} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover object-[center_18%]" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-5xl text-foreground/25">{persona.id}</span>
                </div>
              )}
            </div>
            <h4>
              {persona.id}. {persona.label}
            </h4>
          </figure>
        ))}
      </section>
    </div>
  );
}
