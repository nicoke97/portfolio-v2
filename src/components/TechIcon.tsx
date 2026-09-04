import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

/** Monochrome marks — inherit text color via currentColor. */
export function TechIcon({ name }: { name: string }) {
  switch (name) {
    case "React":
      return (
        <Icon>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.8"
            stroke="currentColor"
            strokeWidth="1.4"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.8"
            stroke="currentColor"
            strokeWidth="1.4"
            transform="rotate(120 12 12)"
          />
        </Icon>
      );
    case "Next.js":
      return (
        <Icon>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8.2 7.5h2.1l5.5 8.2V7.5H18v9h-2.1L10.4 8.3V16.5H8.2V7.5z"
            fill="currentColor"
          />
        </Icon>
      );
    case "TypeScript":
      return (
        <Icon>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7.2 11.2h3.8v1.1H9.2v5.7H7.9v-5.7H6.1v-1.1h1.1zm7.1-.2c1.1 0 1.9.3 2.4 1l-.9.7c-.3-.4-.7-.6-1.3-.6-.7 0-1.2.4-1.2 1 0 .5.3.8 1.3 1.2 1.5.6 2.1 1.2 2.1 2.4 0 1.4-1.1 2.3-2.6 2.3-1.2 0-2.1-.5-2.6-1.3l1-.7c.3.5.8.8 1.5.8.7 0 1.2-.4 1.2-1 0-.6-.4-.9-1.4-1.3-1.3-.5-2-.1-2.1-2.2 0-1.3 1-2.3 2.6-2.3z"
            fill="currentColor"
          />
        </Icon>
      );
    case "JavaScript":
      return (
        <Icon>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10.2 16.6c.2.4.5.7 1 .7.5 0 .8-.2.8-.9v-5.6h1.5v5.6c0 1.8-1.1 2.6-2.6 2.6-1.4 0-2.2-.7-2.6-1.6l1.4-.8zm4.6-.1c.3.6.7 1.1 1.6 1.1.7 0 1.1-.3 1.1-.9 0-.6-.5-.8-1.3-1.1l-.4-.2c-1.3-.5-2.1-1.2-2.1-2.6 0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.4.9c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.4.2c1.5.6 2.3 1.3 2.3 2.7 0 1.6-1.2 2.4-2.9 2.4-1.6 0-2.7-.8-3.2-1.8l1.4-.8z"
            fill="currentColor"
          />
        </Icon>
      );
    case "C#":
      return (
        <Icon>
          <path
            d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 14.2a3.2 3.2 0 1 1 2.6-5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M14.2 10.2h4M14.2 12.4h4M15.8 8.8v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </Icon>
      );
    case ".NET":
      return (
        <Icon>
          <path
            d="M4 7.5h16v9H4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <text
            x="12"
            y="13.7"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="700"
            fill="currentColor"
            fontFamily="system-ui, sans-serif"
          >
            .NET
          </text>
        </Icon>
      );
    case "SQL":
      return (
        <Icon>
          <ellipse cx="12" cy="6.5" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M4.5 6.5v8c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M4.5 10.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" stroke="currentColor" strokeWidth="1.4" />
        </Icon>
      );
    case "Python":
      return (
        <Icon>
          <path
            d="M12 3.5c3.5 0 5 1.2 5 4.2V10H9.5c-2 0-3.2 1-3.2 3.2v1.2H4.2C3 14.4 3 12.8 3 11.5 3 6.5 6 3.5 12 3.5z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M12 20.5c-3.5 0-5-1.2-5-4.2V14h7.5c2 0 3.2-1 3.2-3.2V9.6h2.1c1.2 0 1.2 1.6 1.2 2.9 0 5-3 8-9 8z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="9.8" cy="6.8" r="0.9" fill="currentColor" />
          <circle cx="14.2" cy="17.2" r="0.9" fill="currentColor" />
        </Icon>
      );
    case "Docker":
      return (
        <Icon>
          <path
            d="M3.5 13h2.2v2.2H3.5zm2.8 0h2.2v2.2H6.3zm2.8 0h2.2v2.2H9.1zm2.8 0h2.2v2.2h-2.2zM6.3 10.2h2.2v2.2H6.3zm2.8 0h2.2v2.2H9.1zm2.8 0h2.2v2.2h-2.2zM9.1 7.4h2.2v2.2H9.1z"
            fill="currentColor"
          />
          <path
            d="M16.8 12.2s-1 1.4-1.2 3.2c-.2 1.4.6 2.4.6 2.4H3.2S2 17.8 2 19.2C2 21.2 4.4 22.5 8 22.5c4.8 0 8.2-2 9.6-4.8 1.4 0 2.2-1.2 2.2-1.2s-1.5.4-2.4-.3c-.7-.5-1.2-1.8-.6-2.8.4-.7 1.5-1.2 1.5-1.2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </Icon>
      );
    case "Unity":
      return (
        <Icon>
          <path
            d="M12 3.5 4.5 7.8v8.4L12 20.5l7.5-4.3V7.8L12 3.5zm0 2.6 4.8 2.8v5.4L12 17.1l-4.8-2.8V9l4.8-2.8z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </Icon>
      );
    case "GitHub":
      return (
        <Icon>
          <path
            fill="currentColor"
            d="M12 2.5C6.7 2.5 2.5 6.7 2.5 12c0 4.2 2.7 7.7 6.5 9 .5.1.6-.2.6-.5v-1.6c-2.6.6-3.2-1.1-3.2-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 3.8-1.3 6.4-4.8 6.4-9 0-5.3-4.2-9.5-9.5-9.5z"
          />
        </Icon>
      );
    case "Vercel":
      return (
        <Icon>
          <path d="M12 4.5 20.5 19.5h-17L12 4.5z" fill="currentColor" />
        </Icon>
      );
    case "Supabase":
      return (
        <Icon>
          <path
            d="M13.2 3.5 5.5 14.2h5.2L8.8 20.5l9.2-12.2h-4.8l1.8-4.8z"
            fill="currentColor"
          />
        </Icon>
      );
    case "TFS":
      return (
        <Icon>
          <path
            d="M12 3.5 19.5 7.5v9L12 20.5 4.5 16.5v-9L12 3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <text
            x="12"
            y="13.6"
            textAnchor="middle"
            fontSize="5"
            fontWeight="700"
            fill="currentColor"
            fontFamily="system-ui, sans-serif"
          >
            TFS
          </text>
        </Icon>
      );
    case "TeamCity":
      return (
        <Icon>
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 7.5h11M6.5 12h7.5M6.5 16.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </Icon>
      );
    case "Octopus":
      return (
        <Icon>
          <circle cx="12" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 12.5c-.2 2.5-2 4.2-2.6 5.5 1.5-.6 3-.3 4.2 1.2 0-1.8.6-3 2.4-3s2.4 1.2 2.4 3c1.2-1.5 2.7-1.8 4.2-1.2-.6-1.3-2.4-3-2.6-5.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10.4" cy="9.4" r="0.8" fill="currentColor" />
          <circle cx="13.6" cy="9.4" r="0.8" fill="currentColor" />
        </Icon>
      );
    case "Cursor":
      return (
        <Icon>
          <path
            d="M6 3.5v17l5-5 2.8 6.4 3.4-1.5-2.8-6.4L20.5 13.5 6 3.5z"
            fill="currentColor"
          />
        </Icon>
      );
    case "GitHub Copilot":
      return (
        <Icon>
          <path
            d="M12 4c-3 0-5.5 2-5.5 4.6V11c0 1.2-1.2 1.8-1.8 2.4 1.5.6 2.4 2.1 2.4 3.6 0 2.2 2 3.8 4.9 3.8s4.9-1.6 4.9-3.8c0-1.5.9-3 2.4-3.6-.6-.6-1.8-1.2-1.8-2.4V8.6C17.5 6 15 4 12 4z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="10.2" cy="10" r="1" fill="currentColor" />
          <circle cx="13.8" cy="10" r="1" fill="currentColor" />
        </Icon>
      );
    case "Claude Code":
      return (
        <Icon>
          <path
            d="M12 3.5 13.6 9.5h6.4l-5.2 3.8 2 6.2L12 16.2 7.2 19.5l2-6.2-5.2-3.8h6.4L12 3.5z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </Icon>
      );
    default:
      return (
        <Icon>
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <text
            x="12"
            y="14.2"
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            fill="currentColor"
            fontFamily="system-ui, sans-serif"
          >
            {name.slice(0, 2)}
          </text>
        </Icon>
      );
  }
}
