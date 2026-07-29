import type { ReactNode } from "react";

export type WorkCoverId = "soap-rest" | "framework-core" | "tfs-github";

function Mark({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      {children}
    </svg>
  );
}

function SoapMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <path d="M10 16h28v18H10z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 16 24 26 38 16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 30h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Mark>
  );
}

function RestMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <path
        d="M16 12c-3 0-5 2.2-5 5.2 0 2.2 1 3.6 2.8 4.8C12 23.2 11 24.6 11 26.8 11 30 13 32 16 32"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M32 12c3 0 5 2.2 5 5.2 0 2.2-1 3.6-2.8 4.8C36 23.2 37 24.6 37 26.8 37 30 35 32 32 32"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Mark>
  );
}

function FrameworkMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <path d="M24 6 40 15v18L24 42 8 33V15L24 6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M24 6v36M8 15l16 9 16-9" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </Mark>
  );
}

function CoreMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 24h24M24 12c4 3.4 6.2 7.4 6.2 12S28 32.6 24 36c-4-3.4-6.2-7.4-6.2-12S20 15.4 24 12z" stroke="currentColor" strokeWidth="1.3" />
    </Mark>
  );
}

function TfsMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <path d="M24 7 39 15v18L24 41 9 33V15L24 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 22h16M24 18v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Mark>
  );
}

function GithubMark() {
  return (
    <Mark className="size-16 md:size-[4.5rem]">
      <path
        fill="currentColor"
        d="M24 8C15.2 8 8 15.2 8 24c0 7.1 4.6 13.1 11 15.2.7.1 1-.3 1-.8v-2.8c-4.4 1-5.4-1.9-5.4-1.9-.7-1.8-1.7-2.3-1.7-2.3-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.6 3.8 1.8 4.7 1.4.1-1.1.6-1.8 1-2.2-3.6-.4-7.3-1.8-7.3-7.8 0-1.7.6-3.2 1.7-4.3-.2-.4-.7-2 .2-4.2 0 0 1.4-.4 4.4 1.6a15 15 0 0 1 8 0c3-2 4.4-1.6 4.4-1.6.9 2.2.4 3.8.2 4.2 1.1 1.1 1.7 2.6 1.7 4.3 0 6-3.7 7.4-7.3 7.8.6.5 1.1 1.5 1.1 3.1v4.4c0 .5.3.9 1.1.8C35.4 37.1 40 31.1 40 24 40 15.2 32.8 8 24 8z"
      />
    </Mark>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 56 16" className="cover-arrow h-5 w-24 text-primary md:h-6 md:w-28" fill="none" aria-hidden>
      <path d="M2 8h46" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="cover-arrow-line" />
      <path d="M42 3.5 50 8l-8 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="cover-arrow-head" />
    </svg>
  );
}

function Side({
  mark,
  label,
  token,
  tone,
}: {
  mark: ReactNode;
  label: string;
  token: string;
  tone: "from" | "to";
}) {
  return (
    <div className={`cover-side cover-${tone} flex w-[42%] flex-col items-center gap-5`}>
      <div className="flex size-24 items-center justify-center rounded-full border border-foreground/10 bg-background md:size-28">
        {mark}
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium tracking-[0.12em] uppercase md:text-[14px]">{label}</p>
        <p className="mt-1.5 font-mono text-[14px] text-foreground-light md:text-[15px]">{token}</p>
      </div>
    </div>
  );
}

const scenes: Record<WorkCoverId, { from: { mark: ReactNode; label: string; token: string }; to: { mark: ReactNode; label: string; token: string } }> = {
  "soap-rest": {
    from: { mark: <SoapMark />, label: "SOAP", token: "<Fault/>" },
    to: { mark: <RestMark />, label: "REST", token: "200 OK" },
  },
  "framework-core": {
    from: { mark: <FrameworkMark />, label: "Framework", token: "net48" },
    to: { mark: <CoreMark />, label: "Core", token: "net8.0" },
  },
  "tfs-github": {
    from: { mark: <TfsMark />, label: "TFS", token: "tfvc" },
    to: { mark: <GithubMark />, label: "GitHub", token: "git / yaml" },
  },
};

export function WorkCoverAnimation({ id }: { id: WorkCoverId }) {
  const scene = scenes[id];

  return (
    <div className={`cover-scene cover-scene-${id} absolute inset-0 bg-[#f3eee8]`}>
      <div className="absolute inset-x-6 top-5 border-t border-foreground/10 md:inset-x-8 md:top-6" />
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        <div className="flex w-full max-w-[680px] items-center justify-between">
          <Side {...scene.from} tone="from" />
          <Arrow />
          <Side {...scene.to} tone="to" />
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-5 border-t border-foreground/10 md:inset-x-8 md:bottom-6" />
    </div>
  );
}
