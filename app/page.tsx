import { ExperienceList } from "@/components/ExperienceList";
import { OnekoPlayground } from "@/components/OnekoPlayground";
import { ProjectCard } from "@/components/ProjectCard";
import { workProjects } from "@/data/site";

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-16">
      <section className="grid w-full grid-cols-1 gap-12 pb-24 lg:grid-cols-2 lg:gap-12" style={{ paddingTop: "clamp(32px, 12vh, 180px)" }}>
        <OnekoPlayground />
        <div className="flex w-full flex-col gap-6">
          <h1 className="leading-[1.1] tracking-[-0.02em] text-foreground">
            <span className="block whitespace-nowrap" style={{ fontSize: "clamp(16px, 2vw, 40px)" }}>
              I&apos;m{" "}
              <span className="group" style={{ position: "relative", display: "inline-block" }}>
                <svg
                  viewBox="37 52 461 371"
                  aria-hidden="true"
                  style={{ position: "absolute", bottom: "100%", left: 0, width: "120%", height: "auto" }}
                >
                  <defs>
                    <filter id="colorize-nico">
                      <feColorMatrix type="matrix" values="0 0 0 0 0.196 0 0 0 0 0.251 0 0 0 0 0.310 -0.333 -0.333 -0.333 1 0" />
                    </filter>
                    <filter id="colorize-nico-hover">
                      <feColorMatrix type="matrix" values="0 0 0 0 0.745 0 0 0 0 0.439 0 0 0 0 0.298 -0.333 -0.333 -0.333 1 0" />
                    </filter>
                    <clipPath id="draw-reveal">
                      <rect x="0" y="0" width="500" height="0">
                        <animate attributeName="height" from="0" to="500" dur="1.4s" begin="1.2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
                      </rect>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#draw-reveal)">
                    <image href="/projects/drawing/nicoke_no_bck.png" width="500" height="500" preserveAspectRatio="xMidYMid meet" filter="url(#colorize-nico)" className="transition-opacity duration-200 group-hover:opacity-0">
                      <animate attributeName="opacity" from="0" to="1" dur="1.4s" begin="1.2s" fill="freeze" />
                    </image>
                    <image href="/projects/drawing/nicoke_no_bck.png" width="500" height="500" preserveAspectRatio="xMidYMid meet" filter="url(#colorize-nico-hover)" className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </g>
                </svg>
                <span className="inline-flex transition-colors duration-200 group-hover:text-primary">
                  <span className="nico-n inline-block">N</span>
                  <span className="nico-i inline-block">i</span>
                  <span className="nico-c inline-block">c</span>
                  <span className="nico-o inline-block">o</span>
                </span>
              </span>
              , a full-stack software engineer
            </span>
            <span className="block" style={{ fontSize: "clamp(16px, 2vw, 40px)" }}>
              who <span className="italic" data-easter="slab">loves UX</span>.
            </span>
          </h1>
          <ExperienceList className="mt-4" />
        </div>
      </section>

      <div className="mb-10 border-t border-foreground/10 pt-8">
        <h4>Work Projects</h4>
      </div>

      <section className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {workProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} priority={project.slug === "slabhq"} />
        ))}
      </section>
    </div>
  );
}
