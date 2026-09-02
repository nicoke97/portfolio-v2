import { experiences } from "@/data/site";

export function ExperienceList({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      {experiences.map((job, index) => (
        <div key={`${job.year}-${job.role}`} className="group flex gap-x-4">
          {/* timeline + year */}
          <div className="relative flex w-[72px] shrink-0 flex-col items-start pt-[3px]">
            <div className="flex items-center gap-2">
              <div className="size-1.5 shrink-0 rounded-full bg-foreground/30" />
              <h4>{job.year}</h4>
            </div>
            {index < experiences.length - 1 && (
              <div className="ml-[2.5px] w-px flex-1 bg-foreground/10" />
            )}
          </div>

          {/* role + company */}
          <div className="grid grid-cols-[250px_1fr] items-baseline gap-x-8 pb-4 pt-[2px]">
            <p className="text-[15px] font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary">{job.role}</p>
            {job.href ? (
              <a href={job.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
                <p className="text-[13px] text-foreground-light hover:text-foreground">{job.company}</p>
              </a>
            ) : (
              <p className="text-[13px] text-foreground-light">{job.company}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
