import { setDefaultResultOrder } from "node:dns";

import type { Activity } from "react-activity-calendar";

import { ACTIVITY_START, site } from "@/data/site";

setDefaultResultOrder("ipv4first");

const FETCH_MS = 12000;

const LEVEL: Record<string, Activity["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type Day = { date: string; contributionCount: number; contributionLevel: string };

type Collection = {
  restrictedContributionsCount: number;
  contributionCalendar: {
    weeks: { contributionDays: Day[] }[];
  };
};

type GithubPayload = {
  data?: {
    viewer?: { login?: string; contributionsCollection?: Collection };
    user?: { contributionsCollection?: Collection };
  };
};

export type GithubContributions = {
  total: number;
  contributions: Activity[];
  includesPrivate: boolean;
};

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": `${site.githubUser}-portfolio`,
  };
}

function flatten(weeks: { contributionDays: Day[] }[]): Activity[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL[day.contributionLevel] ?? 0,
    })),
  );
}

function emptyYear(): Activity[] {
  const end = new Date();
  const start = new Date(`${ACTIVITY_START}T00:00:00`);
  const days: Activity[] = [];
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);

  while (cursor <= end) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    days.push({ date: `${year}-${month}-${day}`, count: 0, level: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

/** Keep a continuous ACTIVITY_START → today range so the heatmap never changes size. */
function fillRange(days: Activity[]): Activity[] {
  const byDate = new Map(days.filter((day) => day.date >= ACTIVITY_START).map((day) => [day.date, day]));
  return emptyYear().map((empty) => byDate.get(empty.date) ?? empty);
}

function asContributions(days: Activity[], includesPrivate: boolean): GithubContributions {
  const contributions = fillRange(days);
  return {
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    contributions,
    includesPrivate,
  };
}

export function emptyGithubContributions(): GithubContributions {
  return asContributions([], false);
}

async function fromGithub(token: string): Promise<GithubContributions | null> {
  let response: Response;
  try {
    response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_MS),
      headers: githubHeaders(token),
      body: JSON.stringify({
        query: `query ($login: String!, $from: DateTime!, $to: DateTime!) {
        viewer {
          login
          contributionsCollection(from: $from, to: $to) {
            restrictedContributionsCount
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            restrictedContributionsCount
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }`,
        variables: {
          login: site.githubUser,
          from: `${ACTIVITY_START}T00:00:00.000Z`,
          to: new Date().toISOString(),
        },
      }),
    });
  } catch {
    return null;
  }

  if (!response.ok) return null;
  const payload = (await response.json()) as GithubPayload;
  const viewer = payload.data?.viewer;
  const isViewer = viewer?.login?.toLowerCase() === site.githubUser.toLowerCase();
  const collection = isViewer ? viewer?.contributionsCollection : payload.data?.user?.contributionsCollection;
  if (!collection) return null;

  return asContributions(
    flatten(collection.contributionCalendar.weeks),
    collection.restrictedContributionsCount > 0,
  );
}

async function fromPublic(): Promise<GithubContributions | null> {
  let response: Response;
  try {
    response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
      { cache: "no-store", signal: AbortSignal.timeout(FETCH_MS) },
    );
  } catch {
    return null;
  }
  if (!response.ok) return null;

  const payload = (await response.json()) as {
    contributions: { date: string; count: number; level: number }[];
  };

  if (!payload.contributions?.length) return null;

  return asContributions(
    payload.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as Activity["level"],
    })),
    false,
  );
}

export async function getGithubContributions(): Promise<GithubContributions> {
  try {
    const token = (process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN)?.trim();
    return (token ? await fromGithub(token) : null) ?? (await fromPublic()) ?? emptyGithubContributions();
  } catch {
    return emptyGithubContributions();
  }
}
