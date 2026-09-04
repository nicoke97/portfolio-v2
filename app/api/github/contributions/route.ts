import type { Activity } from "react-activity-calendar";

import { site } from "@/data/site";

const LEVEL: Record<string, Activity["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type Day = { date: string; contributionCount: number; contributionLevel: string };

type GithubPayload = {
  data?: {
    user?: {
      contributionsCollection?: {
        restrictedContributionsCount: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: Day[] }[];
        };
      };
    };
  };
};

function flatten(weeks: { contributionDays: Day[] }[]): Activity[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL[day.contributionLevel] ?? 0,
    })),
  );
}

async function fromGithub(token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": `${site.githubUser}-portfolio`,
    },
    body: JSON.stringify({
      query: `query ($login: String!) {
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
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as GithubPayload;
  const collection = payload.data?.user?.contributionsCollection;
  if (!collection) return null;

  return {
    total: collection.contributionCalendar.totalContributions,
    contributions: flatten(collection.contributionCalendar.weeks),
    includesPrivate: collection.restrictedContributionsCount > 0,
  };
}

async function fromPublic() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) return null;

  const payload = (await response.json()) as {
    total: Record<string, number>;
    contributions: { date: string; count: number; level: number }[];
  };

  return {
    total: payload.total.lastYear ?? 0,
    contributions: payload.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as Activity["level"],
    })),
    includesPrivate: false,
  };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const payload = (token ? await fromGithub(token) : null) ?? (await fromPublic());

  if (!payload) {
    return Response.json({ total: 0, contributions: [], includesPrivate: false });
  }

  return Response.json(payload);
}
