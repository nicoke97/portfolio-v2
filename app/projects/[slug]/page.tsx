import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const toc = [
    { id: "overview", label: "Overview" },
    ...project.sections.map((section) => ({ id: section.id, label: section.label })),
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1800px] gap-10 px-6 pt-8 pb-20 lg:pt-12">
      <aside className="sticky top-8 hidden h-fit w-52 shrink-0 flex-col gap-3 lg:flex">
        <Link href={project.page === "fun" ? "/fun" : "/"} className="mb-4 flex items-center gap-2" data-cursor="back">
          <ArrowLeft className="size-3.5" />
          <h4 className="hover:!text-primary">Back</h4>
        </Link>
        {toc.map((item) => (
          <a key={item.id} href={`#${item.id}`} data-cursor="jump">
            <h4 className="hover:!text-primary">{item.label}</h4>
          </a>
        ))}
      </aside>

      <article className="min-w-0 flex-1">
        <Link href={project.page === "fun" ? "/fun" : "/"} className="mb-6 flex items-center gap-2 lg:hidden" data-cursor="back">
          <ArrowLeft className="size-3.5" />
          <h4>Back</h4>
        </Link>

        <h4 className="mb-3">{project.eyebrow}</h4>
        <h1 className="max-w-3xl text-[36px] leading-[1.12] tracking-[-0.02em] md:text-[48px]">{project.title}</h1>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-[#f3eee8]">
          {project.cover.kind === "image" && project.cover.src ? (
            <Image src={project.cover.src} alt={project.name} fill priority sizes="80vw" className="object-cover" />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(145deg, ${project.cover.from}, ${project.cover.to})` }}
            />
          )}
          {project.cover.kind === "gradient" && project.cover.overlay ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl font-medium text-white md:text-5xl">{project.cover.overlay}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-b border-foreground/10 pb-10 md:grid-cols-4">
          <Meta label="Role" value={project.role} />
          <Meta label="Timeline" value={project.timeline} />
          <Meta label="Team" value={project.team} />
          <div>
            <h4 className="mb-2">Skills</h4>
            <div className="space-y-1 text-[15px]">
              {project.skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
            </div>
          </div>
        </div>

        <section id="overview" className="scroll-mt-10 border-b border-foreground/10 py-12">
          <h4 className="mb-4">Overview</h4>
          <h2 className="font-serif max-w-3xl text-[28px] leading-snug md:text-[34px]">{project.overview.heading}</h2>
          <div className="mt-5 max-w-2xl space-y-4 text-[16px] leading-relaxed text-foreground-light">
            {project.overview.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {project.liveUrl || project.repoUrl ? (
            <div className="mt-6 flex gap-5">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="open">
                  <h4 className="!text-primary">Live site</h4>
                </a>
              ) : null}
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-cursor="github">
                  <h4 className="hover:!text-primary">Repository</h4>
                </a>
              ) : null}
            </div>
          ) : null}
        </section>

        {project.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-10 border-b border-foreground/10 py-12 last:border-0">
            <h4 className="mb-4">{section.label}</h4>
            <h2 className="font-serif max-w-3xl text-[28px] leading-snug md:text-[34px]">{section.heading}</h2>
            <div className="mt-5 max-w-2xl space-y-4 text-[16px] leading-relaxed text-foreground-light">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="mb-2">{label}</h4>
      <p className="text-[15px]">{value}</p>
    </div>
  );
}
