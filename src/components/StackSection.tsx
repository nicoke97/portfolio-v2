import { stack } from "@/data/site";

import { TechIcon } from "./TechIcon";

export function StackSection() {
  return (
    <section className="border-t border-foreground/10 py-12">
      <h4 className="mb-8">My Stack</h4>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group) => (
          <div key={group.label}>
            <p className="mb-4 text-[13px] text-foreground-light">{group.label}</p>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/stack inline-flex items-center gap-2.5 text-foreground transition-colors duration-150 hover:text-primary"
                    data-cursor="open"
                  >
                    <span className="size-[18px] shrink-0 opacity-70 transition-opacity duration-150 group-hover/stack:opacity-100">
                      <TechIcon name={item.name} />
                    </span>
                    <span className="text-[15px] font-medium tracking-tight">{item.name}</span>
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
