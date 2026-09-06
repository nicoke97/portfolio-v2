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
  resumePath: "/Nicolas_Kelley_CV_engineer.pdf",
  avatar: "/portrait.png",
  languages: ["Spanish (Native)", "English (Native)", "Italian (Conversational)"],
  chatName: "NicoGPT",
};

/** Empty → hot cells for contribution graphs on the light cream background. */
export const githubGreens = ["#eceae6", "#9be9a8", "#40c463", "#30a14e", "#216e39"] as const;
export const cursorOranges = ["#eceae6", "#e8c4b0", "#d4926e", "#be704c", "#8f4a2e"] as const;

/** First day shown on both activity calendars. Nothing earlier is worth showing. */
export const ACTIVITY_START = "2026-04-01";

export const cursorActivity = {
  lineEdits: 6_589_932,
  mostActiveMonth: "June",
  mostActiveDay: "2026-06-21",
  longestStreakDays: 15,
  currentStreakDays: 1,
};

const CURSOR_LEVEL: Record<string, 1 | 2 | 3 | 4> = {
  "2026-05-06": 2,
  "2026-05-07": 2,
  "2026-05-08": 2,
  "2026-05-09": 2,
  "2026-05-10": 2,
  "2026-05-11": 2,
  "2026-05-12": 2,
  "2026-05-13": 2,
  "2026-05-14": 2,
  "2026-05-16": 1,
  "2026-05-17": 3,
  "2026-05-18": 3,
  "2026-05-19": 3,
  "2026-05-20": 3,
  "2026-05-21": 3,
  "2026-05-22": 3,
  "2026-05-23": 2,
  "2026-05-25": 2,
  "2026-05-26": 2,
  "2026-05-27": 2,
  "2026-05-28": 2,
  "2026-05-29": 2,
  "2026-05-30": 2,
  "2026-06-02": 2,
  "2026-06-03": 3,
  "2026-06-04": 3,
  "2026-06-06": 2,
  "2026-06-07": 2,
  "2026-06-08": 2,
  "2026-06-13": 3,
  "2026-06-14": 3,
  "2026-06-15": 3,
  "2026-06-16": 3,
  "2026-06-17": 3,
  "2026-06-18": 3,
  "2026-06-19": 3,
  "2026-06-20": 3,
  "2026-06-21": 4,
  "2026-06-22": 3,
  "2026-06-23": 3,
  "2026-06-24": 3,
  "2026-06-25": 3,
  "2026-06-26": 3,
  "2026-06-27": 3,
  "2026-07-02": 2,
  "2026-07-03": 2,
  "2026-07-04": 2,
  "2026-07-05": 2,
  "2026-07-06": 2,
  "2026-07-07": 2,
  "2026-07-08": 2,
  "2026-07-09": 2,
  "2026-07-10": 2,
  "2026-07-11": 2,
  "2026-07-12": 2,
  "2026-07-14": 1,
  "2026-07-15": 1,
  "2026-07-16": 1,
  "2026-07-23": 1,
  "2026-07-25": 1,
  "2026-07-26": 1,
  "2026-08-06": 1,
  "2026-08-13": 1,
  "2026-08-20": 1,
  "2026-08-27": 2,
  "2026-08-31": 2,
  "2026-09-01": 2,
  "2026-09-02": 1,
  "2026-09-04": 1,
};

const CURSOR_COUNT = [0, 8_400, 28_000, 74_000, 186_000] as const;

function eachIsoDay(start: string, end: string) {
  const days: string[] = [];
  const cursor = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);
  while (cursor <= last) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    days.push(`${year}-${month}-${day}`);
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function todayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const cursorContributionDays = eachIsoDay(ACTIVITY_START, todayIso()).map((date) => {
  const level = CURSOR_LEVEL[date] ?? 0;
  return {
    date,
    count: CURSOR_COUNT[level],
    level: level as 0 | 1 | 2 | 3 | 4,
  };
});

export type Experience = {
  year: string;
  company: string;
  role: string;
  href?: string;
};

export const experiences: Experience[] = [
  {
    year: "2026",
    company: "SlabHQ (live)",
    role: "Founder",
    href: "https://www.slabhq.app",
  },
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

export type ProjectMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  trimStart?: number;
  trimEnd?: number;
  aspect?: string;
  fit?: "cover" | "contain";
  background?: string;
  label?: string;
};

export type ProjectSection = {
  id: string;
  label: string;
  heading: string;
  body: string[];
  media?: ProjectMedia[];
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
    kind: "image" | "gradient" | "video" | "animation";
    src?: string;
    video?: string;
    animation?: "soap-rest" | "framework-core" | "tfs-github";
    from: string;
    to: string;
    accent: string;
    overlay?: string;
    fit?: "cover" | "contain";
  };
  hero?: ProjectMedia;
  overview: {
    heading: string;
    subtitle?: string;
    body: string[];
    media?: ProjectMedia[];
  };
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "slabhq",
    name: "SlabHQ",
    title: "Seller infrastructure for Pokémon TCG",
    eyebrow: "SlabHQ • Live 2026",
    page: "fun",
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
    hero: {
      kind: "video",
      src: "/projects/slabhq/Slabhq_hero.mp4",
      poster: "/projects/slabhq/hero.jpg",
      alt: "SlabHQ landing — inventory in sync across every market",
      trimStart: 5,
      trimEnd: 3,
    },
    overview: {
      heading: "How do you sell a collection when the marketplace will not help you?",
      body: [
        "I started SlabHQ after seeing how complicated the TCG market is in Mexico. In the US you list a card on eBay and move on. Here, Mercado Libre is the biggest marketplace — and for a long time its developer tools were not enough to build around.",
        "So it began as a social binder: every card lives in inventory first, and collectors share one link instead of hundreds of photos that go stale overnight.",
      ],
      media: [
        {
          kind: "image",
          src: "/projects/slabhq/binder.jpg",
          alt: "Public binder — a live collection page with cards, views, and sale marks",
          caption: "The public binder. One link for Discord, Telegram, or a buyer group.",
        },
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
        media: [
          {
            kind: "image",
            src: "/projects/slabhq/listings.png",
            alt: "SlabHQ Headquarters listings queue — AI drafts waiting for review",
            caption: "Headquarters. AI drafts wait in review before anything goes live.",
          },
          {
            kind: "video",
            src: "/projects/slabhq/slabhq_hero_2_cropped.mp4",
            alt: "AI card scanner — photograph a slab and list it on any market",
            caption: "Scan a card, inventory it, list it anywhere.",
          },
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
    title: "eBay, from SOAP to REST",
    eyebrow: "Solera • Shipped 2024",
    page: "work",
    status: "Shipped 2024",
    year: "2024",
    role: "Software Development Engineer I",
    timeline: "2023 — 2024",
    team: "Cross-functional",
    skills: ["C#", ".NET", "SOAP", "REST", "eBay Trading API", "SQL"],
    aspect: "aspect-[16/9]",
    cover: {
      kind: "animation",
      animation: "soap-rest",
      from: "#f3eee8",
      to: "#f3eee8",
      accent: "#be704c",
    },
    hero: {
      kind: "video",
      src: "/projects/Soap/SOAP.mp4",
      alt: "SOAP to REST — the eLink eBay migration",
    },
    overview: {
      heading: "eBay was deprecating their calls.",
      subtitle: "They just never mentioned it.",
      body: [
        "At my time in Solera, one of our most interesting projects was migrating the eBay calls from their SOAP API to REST. eLink — the product I was in charge of then — kept listings, orders, and inventory in sync with eBay.",
        "This was a C# client generated from the Trading API WSDL, and every call was an XML envelope. I led the migration to REST. Same operations, but JSON instead of XML envelopes. Status codes instead of a Fault sitting inside a 200.",
      ],
    },
    sections: [
      {
        id: "why",
        label: "Why",
        heading: "A 200 that still means the call failed.",
        body: [
          "If you have ever handled XML and SOAP calls, you know what I am talking about. Rate limits arrived as XML error structures and faults instead of status codes. Tokens can expire mid-batch. Warning Acks looked like success until you filtered the SeverityCode.",
        ],
      },
      {
        id: "after",
        label: "The after",
        heading: "The cutover.",
        body: [
          "Me and my team moved the callers one operation at a time. We put a single interface in front of listings, orders, and inventory so the rest of eLink did not care whether SOAP or REST was underneath. Both clients ran against the same SKUs. We compared payloads, logged the mismatches, and only cut the WSDL when REST was the only writer and the catalog still matched.",
        ],
      },
    ],
  },
  {
    slug: "NetFramework-to-Core",
    name: "Platform Modernization",
    title: "Migrating .NET Framework to .NET Core",
    eyebrow: "Solera • Shipped 2026",
    page: "work",
    status: "Shipped 2026",
    year: "2026",
    role: "Software Development Engineer II",
    timeline: "2025 — 2026",
    team: "15+ microservices",
    skills: ["C#", ".NET", "SQL", "GitHub", "CI/CD"],
    aspect: "aspect-[16/9]",
    cover: {
      kind: "animation",
      animation: "framework-core",
      from: "#f3eee8",
      to: "#f3eee8",
      accent: "#be704c",
    },
    hero: {
      kind: "video",
      src: "/projects/netcore/NETCORE.mp4",
      alt: "Migrating .NET Framework to .NET Core",
    },
    overview: {
      heading: "A fun project",
      body: [
        "At Solera I led the migration from .NET Framework to .NET Core across a mesh of interconnected services (15 to be exact).",
        "At first, it looked like a compiler problem right up until the first shared package. Then it stopped being about syntax and turns into a graph problem: who consumes what, who is free to move first, and what still assumes the old runtime is going to be there forever.",
        "Framework and Core are not just two versions of the same thing. They differ in how they resolve dependencies, how they handle configuration, and which APIs even exist. Code that had run untouched for years suddenly surfaced assumptions nobody remembered making.",
        "So yeah, the dependency graph was the real project. A service could only move once everything it depended on could run on Core too, and everything that depended on it needed to keep working while it made the jump.",
        "So before touching code, we mapped it: which services shared packages, which packages had already been ported, which ones were dead weight nobody remembered using. That graph decided the migration order more than any technical merit did.",
        "After that we did a dual run, instead of flipping the switch, in an incremental way, for each service. At the end of the day, the migration succeeded because we treated compatibility as the thing to protect, and let the compiler follow.",
      ],
    },
    sections: [],
  },
  {
    slug: "TFS-migration-GH",
    name: "TFS → GitHub",
    title: "Migrating TFS to GitHub",
    eyebrow: "Solera • Shipped 2026",
    page: "work",
    status: "Shipped 2026",
    year: "2026",
    role: "Software Development Engineer II",
    timeline: "2025 — 2026",
    team: "15+ services",
    skills: ["TFS", "GitHub", "CI/CD", "Git", "YAML"],
    aspect: "aspect-[16/9]",
    cover: {
      kind: "animation",
      animation: "tfs-github",
      from: "#f3eee8",
      to: "#f3eee8",
      accent: "#be704c",
    },
    hero: {
      kind: "video",
      src: "/projects/github/GITHUB.mp4",
      alt: "Migrating TFS to GitHub",
    },
    overview: {
      heading: "We were still shipping from TFS.",
      body: [
        "At Solera, source, work items, and builds still lived in Team Foundation Server. I led the migration to GitHub for a couple services and microservices. We were looking for a place to have a better control for history, reviews, and GH Copilot.",
      ],
    },
    sections: [
      {
        id: "after",
        label: "The after",
        heading: "The cutover.",
        body: [
          "Me and my team moved one service at a time. Mirror the repo, stand up the pipeline on GitHub, compare artifacts against the TFS build, and only cut TFS when GitHub was the only writer and the output still matched.",
        ],
      },
    ],
  },
  {
    slug: "falsify",
    name: "Falsify",
    title: "I love videogames, so created one",
    eyebrow: "Falsify • Coming 2027",
    page: "fun",
    status: "Coming January 2027",
    year: "2027",
    role: "Designer / Engineer",
    timeline: "In development",
    team: "Solo · Unity",
    skills: ["Unity", "C#", "Narrative design"],
    aspect: "aspect-[16/10]",
    cover: {
      kind: "video",
      video: "/projects/falsify/gameplay1.mp4",
      from: "#1a1024",
      to: "#c4b5fd",
      accent: "#a78bfa",
    },
    hero: {
      kind: "video",
      src: "/projects/falsify/gameplay1.mp4",
      alt: "Walking the city graybox with a pistol",
    },
    overview: {
      heading: "A paper has never been the point.",
      subtitle: "Falsify tells a story where you will build an empire out of other people's lies to prove your own truth.",
      body: [
        "You were declared dead by a clerical error. No one in your own office can confirm you ever existed. To get your life back, you become a forger, and discover that a single piece of paper can make anyone real: a ghost with a job, a dog with an inheritance, a mayor born at sixty. Build an empire out of other people's lies, evade the one investigator who won't stop looking, and face the trial where your own forged existence becomes the evidence against you. Falsify is a narrative tycoon about identity, bureaucracy, and the terrifying discovery that the system was never checking anyone, not even you.",
      ],
      media: [
        {
          kind: "image",
          src: "/projects/falsify/screenshot - top of the building.png",
          alt: "Sunset from a rooftop over the low-poly city",
          caption: "The city from a roof.",
        },
      ],
    },
    sections: [
      {
        id: "release",
        label: "Release",
        heading: "How and when.",
        body: [
          "I'm making it in Unity. January 2027 is the date.",
          "These are just clips from the neighborhood.",
        ],
        media: [
          {
            kind: "video",
            src: "/projects/falsify/modeling1.mp4",
            alt: "Blocking a low-poly apartment in Unity",
            caption: "An interior I am building.",
          },
          {
            kind: "video",
            src: "/projects/falsify/carmodeling1.mp4",
            alt: "Placing cars on a suburban street",
            caption: "Cars, streets, the neighborhood.",
          },
        ],
      },
    ],
  },
  {
    slug: "codenda",
    name: "Codenda",
    title: "Kumon, but for Python",
    eyebrow: "Codenda • Personal",
    page: "fun",
    status: "Personal project",
    year: "2026",
    repoUrl: "https://github.com/nicoke97/InterviewOS",
    role: "Designer / Engineer",
    timeline: "2026",
    team: "Solo",
    skills: ["React", "Python", "FastAPI", "SQLite"],
    aspect: "aspect-[16/10]",
    cover: {
      kind: "video",
      video: "/projects/codenda/codenda_coding1.mp4",
      src: "/projects/codenda/codenda main.png",
      from: "#2a2114",
      to: "#e8b86d",
      accent: "#d4a574",
    },
    hero: {
      kind: "video",
      src: "/projects/codenda/codenda_coding1.mp4",
      poster: "/projects/codenda/codenda main.png",
      alt: "Codenda worksheet — writing Python on a Kumon-style drill",
    },
    overview: {
      heading: "A daily sheet that will not let you skip mastery.",
      body: [
        "Kumon shaped how I work: a desk, a pencil, and a worksheet that looks almost too easy until the last problems of the set. You do not skip ahead because you are clever. You finish the sheet correctly, in time, and you come back tomorrow.",
        "Codenda points that method at Python — timed sessions, a streak calendar, and levels that will not let you jump ahead.",
      ],
      media: [
        {
          kind: "image",
          src: "/projects/codenda/codenda main.png",
          alt: "Codenda dashboard — streak, session calculator, and curriculum levels",
          caption: "The dashboard. Fifteen minutes, then the sheet.",
        },
      ],
    },
    sections: [
      {
        id: "method",
        label: "The method",
        heading: "Mastery before advancement",
        body: [
          "Short drills, one micro-skill per set, scaffolding that fades from fill-in-the-blank to a blank page, and a clock that cares whether you actually own the pattern.",
          "When the set is yours, LeetCode opens — same problem, three tiers: hints, minimal help, from memory.",
        ],
        media: [
          {
            kind: "video",
            src: "/projects/codenda/codenda_writing.mp4",
            alt: "Codenda LeetCode practice — Two Sum from memory",
            caption: "Two Sum, from memory. No looking.",
          },
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
      kind: "video",
      video: "/projects/rankine/rankine-main.mp4",
      from: "#0b3038",
      to: "#7ed4c8",
      accent: "#2dd4bf",
    },
    hero: {
      kind: "video",
      src: "/projects/rankine/rankine-main.mp4",
      alt: "Rankine OS — 3D plant layout, dragging the boiler on the grid",
    },
    overview: {
      heading: "He needed a Rankine cycle he could argue with.",
      body: [
        "I coded this so my little brother could finish his energy-engineering thesis — not a textbook diagram that pretends steam is an ideal gas.",
        "Boiler, turbine, condenser, pump. Heat in, work out, waste heat dumped. Efficiency is a slogan until you watch net work move when you change steam temperature.",
      ],
      media: [
        {
          kind: "video",
          src: "/projects/rankine/rankine_graphs.mp4",
          alt: "Rankine OS — T-s and h-s diagrams with exergy destruction",
          caption: "T-s, h-s, and the exergy the textbook leaves out.",
        },
      ],
    },
    sections: [
      {
        id: "next",
        label: "Where it goes",
        heading: "Thesis first. Plant later.",
        body: [
          "IAPWS-IF97 properties and exergy are already on the bench. The PID chases a load instead of a homework answer.",
        ],
        media: [
          {
            kind: "video",
            src: "/projects/rankine/control-and-pid.mp4",
            alt: "Rankine OS — PID chasing a net-work setpoint",
            caption: "Set a load. Watch the loop close.",
          },
        ],
      },
    ],
  },
];

export const workProjects = projects.filter((project) => project.page === "work");
export const funProjects = projects.filter((project) => project.page === "fun");

export const about = {
  headline: "I love traveling, and making complicated things feel simple",
  lede: "I started out studying Biomedical Engineering and somehow found my way into software. Since then I've worked across API calls, CI/CD Modernization, UI/UX design and whatever else needed figuring out.",
  open: "I'm always up for a good problem, a good team, or a good idea.",
  personas: [
    {
      id: "01",
      label: "ENGINEER",
      tone: "#efe8df",
      images: [
        { src: "/nicoke/nicoke.png", caption: "this is me", width: 498, height: 710, position: "center 28%" },
        { src: "/nicoke/engineer 3 - code grinding.jfif", caption: "code grinding", width: 1280, height: 1250, position: "center 40%" },
        { src: "/nicoke/engineer 2 - bootcamper.png", caption: "bootcamper", width: 575, height: 745, position: "center 62%" },
        { src: "/nicoke/engineer 1 - ready for surgery.png", caption: "ready for surgery", width: 526, height: 804, position: "center 42%" },
      ],
    },
    {
      id: "02",
      label: "TRAVELER",
      tone: "#f3e4d4",
      images: [
        { src: "/nicoke/traveler 1 - hikemaxxing.png", caption: "hiking!", width: 716, height: 889, position: "42% 58%" },
        { src: "/nicoke/traveler 2 - cliff jumping.png", caption: "cliff jumping", width: 498, height: 752, position: "68% 72%" },
        { src: "/nicoke/traveler 3 - tarzan who.png", caption: "tarzan who", width: 674, height: 859, position: "center 46%" },
        { src: "/nicoke/traveler 4 -koniichiwa.png", caption: "konichiwa", width: 622, height: 850, position: "center 48%" },
      ],
    },
    {
      id: "03",
      label: "CREATIVE",
      tone: "#d9e2ea",
      images: [
        { src: "/nicoke/creative 1 - built my own brand.jfif", caption: "built my own clothing brand", width: 1298, height: 1600, position: "center 40%" },
        { src: "/nicoke/creative 2 - collab with big brands.jfif", caption: "collab with big brands", width: 1320, height: 1478, position: "center center" },
        { src: "/nicoke/creative 3 - i love drawing.png", caption: "i love drawing and The Office", width: 490, height: 737, position: "center 55%" },
        { src: "/nicoke/creative 4 - made mkt campaigns.jfif", caption: "made mkt campaigns", width: 1308, height: 1600, position: "center 48%" },
      ],
    },
    {
      id: "04",
      label: "LIFE ENJOYER",
      tone: "#ece4f5",
      images: [
        { src: "/nicoke/life enjoyer 1 - naruto nerd.png", caption: "naruto nerd", width: 547, height: 846, position: "center 52%" },
        { src: "/nicoke/life enjoyer 1 - videogame freak.png", caption: "videogamez", width: 659, height: 719, position: "center 45%" },
        { src: "/nicoke/life enjoyer 2 - friendmaxxing.png", caption: "friendmaxxing", width: 765, height: 758, position: "center 42%" },
        { src: "/nicoke/life enjoyer 3 - performative climber.png", caption: "performative climber", width: 280, height: 500, position: "58% 48%" },
      ],
    },
  ],
};

export const copy = {
  workHeadline: "Software Engineer · C# / .NET · marketplaces and system migrations.",
  funHeadline: "I live for creating",
  funLede:
    "Engineering is the day job. After hours I build the tools I wish existed.",
};

export const stack = [
  {
    label: "Building with",
    items: [
      { name: "C#", href: "https://learn.microsoft.com/dotnet/csharp/" },
      { name: ".NET", href: "https://dotnet.microsoft.com/" },
      { name: "SQL", href: "https://learn.microsoft.com/sql/" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/" },
      { name: "Next.js", href: "https://nextjs.org/" },
      { name: "React", href: "https://react.dev/" },
    ],
  },
  {
    label: "Also",
    items: [
      { name: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { name: "Python", href: "https://www.python.org/" },
      { name: "Docker", href: "https://www.docker.com/" },
      { name: "Unity", href: "https://unity.com/" },
    ],
  },
  {
    label: "CI/CD",
    items: [
      { name: "GitHub", href: "https://github.com/" },
      { name: "Vercel", href: "https://vercel.com/" },
      { name: "Supabase", href: "https://supabase.com/" },
      { name: "TFS", href: "https://azure.microsoft.com/products/devops/" },
      { name: "TeamCity", href: "https://www.jetbrains.com/teamcity/" },
      { name: "Octopus", href: "https://octopus.com/" },
    ],
  },
  {
    label: "Agents",
    items: [
      { name: "Cursor", href: "https://cursor.com/" },
      { name: "GitHub Copilot", href: "https://github.com/features/copilot" },
      { name: "Claude Code", href: "https://code.claude.com/" },
    ],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
