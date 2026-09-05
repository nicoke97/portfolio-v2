import { ExperienceList } from "@/components/ExperienceList";
import { GitHubActivity } from "@/components/GitHubActivity";
import { NicoName } from "@/components/NicoName";
import { OnekoPlayground } from "@/components/OnekoPlayground";
import { ProjectCard } from "@/components/ProjectCard";
import { StackSection } from "@/components/StackSection";
import { workProjects } from "@/data/site";

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-16">
      <section className="grid w-full grid-cols-1 gap-8 pb-24 lg:grid-cols-2 lg:gap-12" style={{ paddingTop: "clamp(32px, 12vh, 180px)" }}>
        <OnekoPlayground />
        <div className="flex w-full flex-col gap-6">
          <h1 className="leading-[1.1] tracking-[-0.02em] text-foreground">
            <span className="block" style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}>
              I&apos;m <NicoName />, a full-stack software engineer
            </span>
            <span className="block" style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}>
              who <span className="italic" data-easter="slab">loves</span> UX,
            </span>
            <span className="block" style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}>
              and the systems behind it.
            </span>
          </h1>
          <ExperienceList className="mt-4" />
        </div>
      </section>

      <StackSection />

      <div className="mb-10 border-t border-foreground/10 pt-8">
        <h4>Work Projects</h4>
      </div>

      <section className="grid grid-cols-1 gap-x-6 gap-y-12 pb-24 md:grid-cols-3">
        {workProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} priority={project.slug === "slabhq"} />
        ))}
      </section>

      <GitHubActivity />
    </div>
  );
}
