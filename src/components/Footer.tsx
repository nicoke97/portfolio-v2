import { site } from "@/data/site";

import { EmailCopy } from "./EmailCopy";

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center border-t border-foreground/10 px-6 py-6">
      <div className="flex w-full max-w-[1800px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-medium tracking-tight text-foreground">
            Design &amp; Developed by {site.name}
          </p>
          <p className="text-[12px] text-foreground-light">© 2026. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="linkedin">
            <h4 className="hover:!text-primary">Linkedin</h4>
          </a>
          <EmailCopy />
          <a href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="github">
            <h4 className="hover:!text-primary">Github</h4>
          </a>
        </div>
      </div>
    </footer>
  );
}
