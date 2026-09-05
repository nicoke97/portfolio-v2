import { stack } from "@/data/site";

import { TechIcon } from "./TechIcon";

export function StackSection() {
  return (
    <section className="border-t border-foreground/10 py-8 sm:py-12">
      <h4 className="mb-6 sm:mb-8">My Stack</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-4">
        {stack.map((group) => (
          <div key={group.label} className="min-w-0">
            <p className="mb-3 text-[13px] text-foreground-light sm:mb-4">{group.label}</p>
            <ul className="flex flex-col gap-2 sm:gap-2.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/stack inline-flex max-w-full items-center gap-2 text-foreground transition-colors duration-150 hover:text-primary sm:gap-2.5"
                    data-cursor="open"
                  >
                    <span className="size-4 shrink-0 opacity-70 transition-opacity duration-150 group-hover/stack:opacity-100 sm:size-[18px]">
                      <TechIcon name={item.name} />
                    </span>
                    <span className="truncate text-[14px] font-medium tracking-tight sm:text-[15px]">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
