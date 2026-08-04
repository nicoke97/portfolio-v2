import { ProjectCard } from "@/components/ProjectCard";
import { copy, funProjects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 pb-16">
      <section className="max-w-4xl pt-8 pb-12">
        <h1 className="text-[36px] leading-[1.12] tracking-[-0.02em] text-foreground md:text-[52px] md:leading-[1.1]">
          I live for streamlining processes,
          <br />
          creating tools that simplify workflows,
          <br />
          and videogames!
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-foreground-light">{copy.funLede}</p>
      </section>

      <section className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {funProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
