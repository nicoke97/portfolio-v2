import { setDefaultResultOrder } from "node:dns";

import type { Activity } from "react-activity-calendar";

import { githubCommitDays, site } from "@/data/site";

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
    totalContributions: number;
    weeks: { contributionDays: Day[] }[];
  };
};

type GithubPayload = {
  data?: {
    viewer?: { id?: string; login?: string; contributionsCollection?: Collection };
    user?: { contributionsCollection?: Collection };
  };
};

type RepoHistoryPayload = {
  data?: {
    viewer?: {
      repositories?: {
        nodes?: {
          createdAt?: string;
          defaultBranchRef?: {
            target?: {
              history?: { nodes?: { committedDate?: string }[] };
            };
          };
        }[];
      };
    };
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
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1);

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

function levelFor(count: number, max: number): Activity["level"] {
  if (count <= 0) return 0;
  if (count >= max * 0.75) return 4;
  if (count >= max * 0.5) return 3;
  if (count >= max * 0.25) return 2;
  return 1;
}

function mergeDays(calendar: Activity[], extra: Map<string, number>): Activity[] {
  const byDate = new Map(calendar.map((day) => [day.date, { ...day }]));

  for (const [date, count] of extra) {
    const current = byDate.get(date);
    if (current) {
      current.count = Math.max(current.count, count);
    } else {
      byDate.set(date, { date, count, level: 0 });
    }
  }

  const days = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const max = Math.max(1, ...days.map((day) => day.count));
  return days.map((day) => ({ ...day, level: levelFor(day.count, max) }));
}

export function emptyGithubContributions(): GithubContributions {
  return { total: 0, contributions: emptyYear(), includesPrivate: false };
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
        query: `query ($login: String!) {
        viewer {
          id
          login
          contributionsCollection {
            restrictedContributionsCount
            contributionCalendar {
              totalContributions
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
          contributionsCollection {
            restrictedContributionsCount
            contributionCalendar {
              totalContributions
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
        variables: { login: site.githubUser },
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

  const contributions = flatten(collection.contributionCalendar.weeks);
  const commitDays = isViewer && viewer?.id ? await commitDaysFromRepos(token, viewer.id) : new Map<string, number>();
  const merged = commitDays.size ? mergeDays(contributions, commitDays) : contributions;
  const total = merged.reduce((sum, day) => sum + day.count, 0);

  return {
    total: Math.max(collection.contributionCalendar.totalContributions, total),
    contributions: merged,
    includesPrivate: collection.restrictedContributionsCount > 0 || commitDays.size > 0,
  };
}

async function commitDaysFromRepos(token: string, authorId: string): Promise<Map<string, number>> {
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);

  let response: Response;
  try {
    response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_MS),
      headers: githubHeaders(token),
      body: JSON.stringify({
        query: `query ($since: GitTimestamp!, $authorId: ID!) {
          viewer {
            repositories(first: 50, ownerAffiliations: OWNER) {
              nodes {
                createdAt
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(since: $since, author: { id: $authorId }, first: 100) {
                        nodes { committedDate }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
        variables: { since: since.toISOString(), authorId },
      }),
    });
  } catch {
    return new Map();
  }

  if (!response.ok) return new Map();
  const payload = (await response.json()) as RepoHistoryPayload;
  const counts = new Map<string, number>();

  for (const repo of payload.data?.viewer?.repositories?.nodes ?? []) {
    const created = repo.createdAt?.slice(0, 10);
    if (created && created >= since.toISOString().slice(0, 10)) {
      counts.set(created, (counts.get(created) ?? 0) + 1);
    }
    for (const node of repo.defaultBranchRef?.target?.history?.nodes ?? []) {
      const date = node.committedDate?.slice(0, 10);
      if (!date) continue;
      counts.set(date, (counts.get(date) ?? 0) + 1);
    }
  }

  return counts;
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
    total: Record<string, number>;
    contributions: { date: string; count: number; level: number }[];
  };

  if (!payload.contributions?.length) return null;

  return {
    total: payload.total.lastYear ?? payload.contributions.reduce((sum, day) => sum + day.count, 0),
    contributions: payload.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as Activity["level"],
    })),
    includesPrivate: false,
  };
}

export async function getGithubContributions(): Promise<GithubContributions> {
  try {
    const token = (process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN)?.trim();
    const payload = (token ? await fromGithub(token) : null) ?? (await fromPublic());

    if (!payload || payload.contributions.length === 0) {
      return emptyGithubContributions();
    }

    const known = new Map(Object.entries(githubCommitDays));
    const knownTotal = [...known.values()].reduce((sum, count) => sum + count, 0);
    if (knownTotal > payload.total) {
      const contributions = mergeDays(payload.contributions, known);
      return {
        total: contributions.reduce((sum, day) => sum + day.count, 0),
        contributions,
        includesPrivate: true,
      };
    }

    return payload;
  } catch {
    return emptyGithubContributions();
  }
}
