export const site = {
  name: "Nicolas Kelley",
  shortName: "Nico",
  title: "Full-Stack Software Engineer",
  location: "Mexico City, Mexico",
  email: "nicokelley97@gmail.com",
  phone: "+52 55 5177 2549",
  linkedin: "https://www.linkedin.com/in/nicolas-kelley-sde97/",
  github: "https://github.com/nicoke97",
  githubUser: "nicoke97",
  resumePath: "/Nicolas-Kelley-CV.pdf",
  avatar: "/portrait.png",
  languages: ["Spanish (Native)", "English (Native)", "Italian (Conversational)"],
  chatName: "NicoGPT",
};

export type Experience = {
  year: string;
  company: string;
  role: string;
  href?: string;
};

export const experiences: Experience[] = [
  {
    year: "2025",
    company: "Solera Holdings",
    role: "Software Development Engineer II",
    href: "https://www.solera.com/",
  },
  {
    year: "2023",
    company: "Solera Holdings",
    role: "Software Development Engineer I",
    href: "https://www.solera.com/",
  },
  {
    year: "2023",
    company: "Solera Holdings",
    role: "Software Developer Engineer — HPEL",
    href: "https://www.solera.com/",
  },
  {
    year: "2022",
    company: "Odoo",
    role: "Functional Support Analyst",
    href: "https://www.odoo.com/",
  },
  {
    year: "2022",
    company: "Hospitales Star Médica",
    role: "Biomedical Engineer",
    href: "https://www.starmedica.com/",
  },
];

export type ProjectSection = {
  id: string;
  label: string;
  heading: string;
  body: string[];
  subheads?: { heading: string; body: string }[];
};

export type Project = {
  slug: string;
  name: string;
  title: string;
  eyebrow: string;
  page: "work" | "fun";
  status: string;
  year: string;
  liveUrl?: string;
  repoUrl?: string;
  role: string;
  timeline: string;
  team: string;
  skills: string[];
  aspect: string;
  cover: {
    kind: "image" | "gradient" | "video";
    src?: string;
    video?: string;
    from: string;
    to: string;
    accent: string;
    overlay?: string;
  };
  overview: {
    heading: string;
    body: string[];
  };
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "slabhq",
    name: "SlabHQ",
    title: "Seller infrastructure for Pokémon TCG",
    eyebrow: "SlabHQ • Live 2026",
    page: "work",
    status: "Live in Mexico",
    year: "2026",
    liveUrl: "https://www.slabhq.app",
    role: "Founder / Full-Stack",
    timeline: "2025 — Present",
    team: "Solo",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Mercado Libre"],
    aspect: "aspect-[16/10]",
    cover: {
      kind: "video",
      video: "/projects/slabhq/Slabhq_hero_lightmode.mp4",
      src: "/projects/slabhq/hero.jpg",
      from: "#12352b",
      to: "#8fd4b8",
      accent: "#34d399",
    },
    overview: {
      heading: "How do you sell a collection when the marketplace will not help you?",
      body: [
        "I started SlabHQ after seeing how complicated the TCG market is in Mexico. In the US you list a card on eBay and move on. Here, Mercado Libre is the biggest marketplace — and for a long time its developer tools were not enough to build around.",
        "So it began as a social binder: every card lives in inventory first, and collectors share one link instead of hundreds of photos that go stale overnight.",
      ],
    },
    sections: [
      {
        id: "product",
        label: "The product",
        heading: "From social binder to a full selling desk",
        body: [
          "A couple of months later Mercado Libre opened up, and SlabHQ grew into a platform with a fully integrated listing experience — manage, share, and sell from the same inventory.",
          "The US launch is planned with eBay integration for early 2027.",
        ],
      },
      {
        id: "why",
        label: "Why it exists",
        heading: "A nerd problem that turned into infrastructure",
        body: [
          "Yeah, I know. I am a bit of a nerd for Pokémon TCG. That is exactly why I would eventually build a tool like this — I needed it, then other people did too.",
        ],
      },
    ],
  },
  {
    slug: "elink-ebay",
    name: "eLink × eBay",
    title: "eBay API integrations for eLink",
    eyebrow: "eLink • Solera",
    page: "work",
    status: "Shipped",
    year: "2024",
    role: "Software Development Engineer I",
    timeline: "2023 — 2024",
    team: "Cross-functional",
    skills: ["C#", ".NET", "eBay API", "REST", "SQL"],
    aspect: "aspect-[16/10]",
    cover: {
      kind: "gradient",
      from: "#0f1f2e",
      to: "#c9dce8",
      accent: "#60a5fa",
      overlay: "eBay API",
    },
    overview: {
      heading: "A marketplace integration is only as good as its edge cases.",
      body: [
        "eBay's API surface is vast. eLink needed a reliable bridge between their catalog and eBay's listing, order, and inventory systems — built to stay up under load and recover cleanly when eBay's endpoints didn't.",
        "The interesting work was not the happy path. It was the rate limits, the partial failures, and the sync logic that had to be right even when the network wasn't.",
      ],
    },
    sections: [
      {
        id: "integration",
        label: "The integration",
        heading: "Listings, orders, inventory — one surface, many contracts",
        body: [
          "Each eBay subsystem has its own quirks. Listings expire. Orders arrive out of order. Inventory drifts if you blink. Building a durable integration means modeling every failure mode before it hits production.",
        ],
      },
    ],
  },
  {
    slug: "modernization",
    name: "Platform Modernization",
    title: "Migrating .NET Framework to .NET Core",
    eyebrow: "Solera • Handed off 2026",
    page: "work",
    status: "Handed off 2026",
    year: "2026",
    role: "Software Development Engineer II",
    timeline: "2025 — 2026",
    team: "15+ microservices",
    skills: ["C#", ".NET", "SQL", "GitHub", "CI/CD"],
    aspect: "aspect-[5/4]",
    cover: {
      kind: "gradient",
      from: "#1c2a38",
      to: "#d7c4a8",
      accent: "#4f6eb6",
      overlay: "Framework → Core",
    },
    overview: {
      heading: "What actually moves in a modernization is the contract, not the compiler.",
      body: [
        "At Solera I led Framework → Core and TFS → GitHub work across a mesh of services. It looks like a compiler problem until the first shared package. Then it is a graph: who consumes what, who can move, and what CI still believes about the world.",
        "The public version of that story is simple. CI is the product. Mentoring is incident response in slow motion.",
      ],
    },
    sections: [
      {
        id: "ci",
        label: "CI is the interface",
        heading: "Teaching a team a new way software leaves the building",
        body: [
          "Moving pipelines is not a YAML rewrite. The interesting bugs were identity, artifacts, and the services that still assumed a Windows agent.",
        ],
      },
      {
        id: "people",
        label: "People",
        heading: "The code is the easy part if the story is clear",
        body: [
          "The same skills you use on a production issue — isolate, instrument, explain — are how you unblock engineers on a migration.",
        ],
      },
    ],
  },
  {
    slug: "microservices",
    name: "Microservices Mesh",
    title: "Optimizing shared functionality across 15+ microservices",
    eyebrow: "Solera • Shipped",
    page: "work",
    status: "Shipped",
    year: "2025",
    role: "Software Development Engineer II",
    timeline: "2024 — 2025",
    team: "15+ services",
    skills: ["C#", ".NET", "SQL", "CI/CD", "Distributed systems"],
    aspect: "aspect-[5/4]",
    cover: {
      kind: "gradient",
      from: "#111c27",
      to: "#b8cdd9",
      accent: "#4f6eb6",
      overlay: "15+",
    },
    overview: {
      heading: "Shared functionality breaks in interesting ways at scale.",
      body: [
        "Across 15+ interconnected services, the real work lives in the contracts between them — not inside any single one. Shared libraries, high-volume data pipelines, and end-to-end workflows that span more systems than any diagram admits.",
        "Optimizing that mesh meant tracing ownership, reducing duplication, and making sure a change in one corner didn't quietly degrade the whole.",
      ],
    },
    sections: [
      {
        id: "scope",
        label: "The scope",
        heading: "End-to-end means owning what you didn't write",
        body: [
          "The most impactful changes were never confined to a single service. They were the shared utilities everyone had quietly forked, and the pipeline bottlenecks nobody had mapped end-to-end until throughput became a complaint.",
        ],
      },
    ],
  },
  {
    slug: "falsify",
    name: "Falsify",
    title: "A forgery tycoon aimed at Steam",
    eyebrow: "Falsify • Coming 2027",
    page: "fun",
    status: "Coming January 2027",
    year: "2027",
    role: "Designer / Engineer",
    timeline: "In development",
    team: "Solo · Unity",
    skills: ["Unity", "C#", "Narrative design"],
    aspect: "aspect-[4/5]",
    cover: {
      kind: "gradient",
      from: "#1a1024",
      to: "#c4b5fd",
      accent: "#a78bfa",
      overlay: "Falsify",
    },
    overview: {
      heading: "Bureaucracy is the monster.",
      body: [
        "A clerical error files you as dead. The only way back is to forge your own ID. Then you notice the unregistered — people the system already erased — and a workshop empire starts sliding paper across your desk.",
        "It is Papers, Please if Kafka wrote it as a PSX-era crime sim.",
      ],
    },
    sections: [
      {
        id: "loop",
        label: "The loop",
        heading: "Intake, print, age, QC, deliver — then Heat moves",
        body: [
          "Rush the work and The Investigator gets a cleaner fingerprint of how you fold a corner. The city graybox is already walkable. The stamp minigame is the heart I still owe the loop.",
        ],
      },
      {
        id: "date",
        label: "January 2027",
        heading: "That is the date I am building toward",
        body: [
          "Vertical slice first, then the seven-chapter story. Gameplay stills will land here as soon as a take is worth watching.",
        ],
      },
    ],
  },
  {
    slug: "pythonos",
    name: "PythonOS",
    title: "Kumon, but for Python",
    eyebrow: "PythonOS • Personal",
    page: "fun",
    status: "Personal project",
    year: "2026",
    repoUrl: "https://github.com/nicoke97/InterviewOS",
    role: "Designer / Engineer",
    timeline: "2026",
    team: "Solo",
    skills: ["React", "Python", "FastAPI", "SQLite"],
    aspect: "aspect-square",
    cover: {
      kind: "gradient",
      from: "#2a2114",
      to: "#e8b86d",
      accent: "#d4a574",
      overlay: "PythonOS",
    },
    overview: {
      heading: "A daily sheet that will not let you skip mastery.",
      body: [
        "Kumon shaped how I work: a desk, a pencil, and a worksheet that looks almost too easy until the last problems of the set. You do not skip ahead because you are clever. You finish the sheet correctly, in time, and you come back tomorrow.",
        "PythonOS points that method at Python — YAML drills, a FastAPI executor, and a classroom that looks like paper.",
      ],
    },
    sections: [
      {
        id: "method",
        label: "The method",
        heading: "Mastery before advancement",
        body: [
          "Short drills, one micro-skill per set, scaffolding that fades from fill-in-the-blank to a blank page, and a clock that cares whether you actually own the pattern.",
          "For now it stays on my machine. I know other people would use it.",
        ],
      },
    ],
  },
  {
    slug: "rankine-os",
    name: "Rankine OS",
    title: "A Rankine-cycle bench for a thesis",
    eyebrow: "Rankine OS • In development",
    page: "fun",
    status: "In development",
    year: "2026",
    repoUrl: "https://github.com/nicoke97/RankineOS",
    role: "Engineer",
    timeline: "2025 — Present",
    team: "With my brother",
    skills: ["React", "Python", "FastAPI", "Three.js"],
    aspect: "aspect-[16/11]",
    cover: {
      kind: "gradient",
      from: "#0b3038",
      to: "#7ed4c8",
      accent: "#2dd4bf",
      overlay: "η",
    },
    overview: {
      heading: "He needed a Rankine cycle he could argue with.",
      body: [
        "I coded this so my little brother could finish his energy-engineering thesis — not a textbook diagram that pretends steam is an ideal gas.",
        "Boiler, turbine, condenser, pump. Heat in, work out, waste heat dumped. Efficiency is a slogan until you watch net work move when you change steam temperature.",
      ],
    },
    sections: [
      {
        id: "next",
        label: "Where it goes",
        heading: "Thesis first. Plant later.",
        body: [
          "The ambition is IAPWS-IF97 properties, exergy, and eventually control so a plant can chase a load instead of a homework answer.",
        ],
      },
    ],
  },
];

export const workProjects = projects.filter((project) => project.page === "work");
export const funProjects = projects.filter((project) => project.page === "fun");

export const about = {
  headline: "I love traveling, photography, and making complicated things feel simple.",
  lede: "I started out studying Biomedical Engineering and somehow found my way into software. Since then, I've worked across products, APIs, infrastructure, UI/UX and whatever else needed figuring out.",
  open: "I'm always up for a good problem, a good team, or a good idea.",
  personas: [
    { id: "01", label: "Engineer", image: "/portrait.png" },
    { id: "02", label: "Builder", tone: "#f3e4d4" },
    { id: "03", label: "Mentor", tone: "#d9e2ea" },
    { id: "04", label: "Nerd", tone: "#ece4f5" },
  ],
};

export const copy = {
  workHeadline: "I'm Nico, a full-stack software engineer who loves UX.",
  funHeadline: "I lose sleep to side quests, games, & tools nobody asked for.",
  funLede:
    "Engineering is the day job, but I make time to ship products, write game loops, and build benches for people I love.",
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
