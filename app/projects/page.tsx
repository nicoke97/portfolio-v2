import Link from "next/link";

import { copy, funProjects } from "@/data/site";

const slabhq = funProjects.find((p) => p.slug === "slabhq")!;
const codenda = funProjects.find((p) => p.slug === "codenda")!;
const rankine = funProjects.find((p) => p.slug === "rankine-os")!;
const falsify = funProjects.find((p) => p.slug === "falsify")!;

const slabMetrics = [
  { label: "Active users", value: "500+" },
  { label: "Listings managed", value: "10 k+" },
  { label: "Live channels", value: "Mercado Libre · WhatsApp" },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-16">
      <section className="max-w-4xl pt-8 pb-12">
        <h1 className="text-[36px] leading-[1.12] tracking-[-0.02em] text-foreground md:text-[52px] md:leading-[1.1]">
          I live for <span className="italic">creating</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-foreground-light">{copy.funLede}</p>
      </section>

      {/* ── SlabHQ hero ── */}
      <section className="mb-16">
        <div className="relative overflow-hidden border border-foreground/10">
          {/* cover video */}
          <div className="aspect-[21/9] w-full bg-[#0d2218]">
            <video
              src={slabhq.cover.kind === "video" ? (slabhq.cover.video ?? "") : ""}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          {/* info row */}
          <div className="flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-8">
            <div className="max-w-lg">
              <h4 className="mb-1">{slabhq.eyebrow}</h4>
              <h2 className="text-[28px] font-medium tracking-tight text-foreground md:text-[36px]">
                {slabhq.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={slabhq.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-[14px] font-medium tracking-tight text-background transition-opacity hover:opacity-80"
                >
                  Open SlabHQ ↗
                </a>
                <Link
                  href={`/projects/${slabhq.slug}`}
                  data-cursor="go"
                  className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2.5 text-[14px] font-medium tracking-tight text-foreground transition-colors hover:border-foreground/50"
                >
                  Case study
                </Link>
              </div>
            </div>

            {/* metrics */}
            <div className="flex shrink-0 flex-col gap-4 sm:items-end sm:text-right">
              {slabMetrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">{m.label}</p>
                  <p className="mt-0.5 text-[20px] font-medium tracking-tight text-foreground">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Secondary grid ── */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Codenda */}
        <Link
          href={`/projects/${codenda.slug}`}
          data-cursor="go"
          className="group flex flex-col border border-foreground/10 p-6 transition-colors hover:border-foreground/30 !opacity-100"
        >
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#2a2114]">
            <video
              src={codenda.cover.kind === "video" ? (codenda.cover.video ?? "") : ""}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <div className="mt-4">
            <h4 className="mb-1">{codenda.eyebrow}</h4>
            <h3 className="text-[18px] font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
              {codenda.title}
            </h3>
            <p className="mt-2 text-[13px] text-foreground-light">Daily Python / interview drills.</p>
          </div>
        </Link>

        {/* Rankine OS */}
        <Link
          href={`/projects/${rankine.slug}`}
          data-cursor="go"
          className="group flex flex-col border border-foreground/10 p-6 transition-colors hover:border-foreground/30 !opacity-100"
        >
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#0b3038]">
            <video
              src={rankine.cover.kind === "video" ? (rankine.cover.video ?? "") : ""}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <div className="mt-4">
            <h4 className="mb-1">{rankine.eyebrow}</h4>
            <h3 className="text-[18px] font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
              {rankine.title}
            </h3>
            <p className="mt-2 text-[13px] text-foreground-light">Rankine-cycle simulator for my brother's thesis.</p>
          </div>
        </Link>

        {/* Falsify */}
        <Link
          href={`/projects/${falsify.slug}`}
          data-cursor="go"
          className="group flex flex-col border border-foreground/10 p-6 transition-colors hover:border-foreground/30 !opacity-100"
        >
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#1a1024]">
            <video
              src={falsify.cover.kind === "video" ? (falsify.cover.video ?? "") : ""}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
          <div className="mt-4">
            <h4 className="mb-1">{falsify.eyebrow}</h4>
            <h3 className="text-[18px] font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
              {falsify.title}
            </h3>
            <p className="mt-2 text-[13px] text-foreground-light">A narrative tycoon. Coming January 2027.</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
