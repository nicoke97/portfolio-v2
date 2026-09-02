import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/site";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group cursor-donut block self-start !opacity-100 transition-all duration-300 ease-in-out"
    >
      <div className={`${project.aspect} relative overflow-hidden bg-[#f3eee8]`}>
        {project.cover.kind === "video" && project.cover.video ? (
          <video
            src={project.cover.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
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
      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">{project.title}</h3>
        <h4 className="shrink-0 text-right">{project.eyebrow}</h4>
      </div>
    </Link>
  );
}
