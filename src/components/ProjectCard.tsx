import Image from "next/image";
import Link from "next/link";

import { WorkCoverAnimation } from "@/components/WorkCoverAnimation";
import type { Project } from "@/data/site";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group cursor-donut flex h-full flex-col !opacity-100 transition-all duration-300 ease-in-out"
    >
      <div
        className={`${project.aspect} relative overflow-hidden bg-[#f3eee8] ${
          project.cover.kind === "animation" ? "border border-foreground/10" : ""
        }`}
      >
        {project.cover.kind === "animation" && project.cover.animation ? (
          <WorkCoverAnimation id={project.cover.animation} />
        ) : project.cover.kind === "video" && project.cover.video ? (
          project.cover.fit === "contain" ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, ${project.cover.from} 0%, ${project.cover.to} 78%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                <video
                  src={project.cover.video}
                  autoPlay
                  muted
                  playsInline
                  className="h-[38%] max-h-[160px] w-auto object-contain"
                />
                {project.cover.overlay ? (
                  <p className="text-center text-3xl font-medium tracking-tight text-white drop-shadow-sm md:text-4xl">
                    {project.cover.overlay}
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <video
              src={project.cover.video}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : project.cover.kind === "image" && project.cover.src ? (
          <Image
            src={project.cover.src}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, ${project.cover.from} 0%, ${project.cover.to} 78%)`,
            }}
          />
        )}
        {project.cover.kind === "gradient" && project.cover.overlay ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="px-6 text-center text-3xl font-medium tracking-tight text-white drop-shadow-sm md:text-4xl">
              {project.cover.overlay}
            </p>
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex min-h-[2.75rem] items-start justify-between gap-4">
        <h3 className="line-clamp-2 text-[15px] font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">{project.title}</h3>
        <h4 className="shrink-0 text-right">{project.eyebrow}</h4>
      </div>
    </Link>
  );
}
