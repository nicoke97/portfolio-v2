"use client";

import { useState } from "react";

import { site } from "@/data/site";

export function EmailCopy({ className = "", inline = false }: { className?: string; inline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const label = copied ? "copied" : "email";

  return (
    <button
      type="button"
      className={className}
      data-cursor="email"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
        } catch {
          window.location.href = `mailto:${site.email}`;
          return;
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      {inline ? <span>{label}</span> : <h4 className="hover:!text-primary">{copied ? "Copied" : "Email"}</h4>}
    </button>
  );
}
