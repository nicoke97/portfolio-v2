"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

import {
  ACTIVITY_START,
  cursorActivity,
  cursorContributionDays,
  cursorOranges,
  githubCommitDays,
  githubGreens,
} from "@/data/site";
import type { GithubContributions } from "@/lib/github-contributions";

const githubTheme = { light: [...githubGreens] };
const cursorTheme = { light: [...cursorOranges] };
const cursorLabels = {
  totalCount: "Local AI edits",
  legend: { less: "Less", more: "More" },
};

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count >= max * 0.75) return 4;
  if (count >= max * 0.5) return 3;
  if (count >= max * 0.25) return 2;
  return 1;
}

function seededGithub(): GithubContributions {
  const end = new Date();
  const start = new Date(`${ACTIVITY_START}T00:00:00`);
  const contributions: GithubContributions["contributions"] = [];
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  while (cursor <= end) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    contributions.push({ date, count: githubCommitDays[date] ?? 0, level: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  const max = Math.max(1, ...contributions.map((day) => day.count));
  const leveled = contributions.map((day) => ({ ...day, level: levelFor(day.count, max) }));
  return {
    total: leveled.reduce((sum, day) => sum + day.count, 0),
    contributions: leveled,
    includesPrivate: true,
  };
}

export function GitHubActivity() {
  const [github, setGithub] = useState<GithubContributions>(seededGithub);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/contributions")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: GithubContributions | null) => {
        if (cancelled || !payload?.contributions.length) return;
        const contributions = payload.contributions.filter((day) => day.date >= ACTIVITY_START);
        if (!contributions.length) return;
        setGithub({
          ...payload,
          contributions,
          total: contributions.reduce((sum, day) => sum + day.count, 0),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <div className="mb-10 border-t border-foreground/10 pt-8">
        <h4>Activity</h4>
      </div>

      <div className="flex flex-col gap-6 pb-4 sm:flex-row">
        {/* GitHub */}
        <div className="flex-1 border border-foreground/10 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
            GitHub
          </p>
          <p className="mt-1 mb-4 text-[22px] font-medium tracking-tight tabular-nums text-foreground">
            {github.total.toLocaleString()}
            <span className="ml-2 text-[13px] font-medium tracking-normal text-foreground-light">
              contributions this year
            </span>
          </p>
          <div className="overflow-x-auto">
            <ActivityCalendar
              data={github.contributions}
              colorScheme="light"
              theme={githubTheme}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              showTotalCount={false}
              showWeekdayLabels={false}
            />
          </div>
        </div>

        {/* Cursor */}
        <div className="flex-1 border border-foreground/10 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
            Cursor
          </p>
          <p className="mt-1 text-[22px] font-medium tracking-tight tabular-nums text-primary">
            {cursorActivity.lineEdits.toLocaleString()}
            <span className="ml-2 text-[13px] font-medium tracking-normal text-foreground-light">
              AI line edits
            </span>
          </p>
          <p className="mb-4 text-[12px] text-foreground-light">
            Most active {cursorActivity.mostActiveMonth} · {cursorActivity.longestStreakDays}d longest streak
          </p>
          <div className="overflow-x-auto">
            <ActivityCalendar
              data={cursorContributionDays}
              colorScheme="light"
              theme={cursorTheme}
              labels={cursorLabels}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              showTotalCount={false}
              showWeekdayLabels={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
