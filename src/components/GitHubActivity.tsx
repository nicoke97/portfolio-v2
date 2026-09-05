"use client";

import { useEffect, useRef, useState } from "react";
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

// Natural block size on GitHub's own calendar
const BASE_BLOCK = 11;
const BASE_MARGIN = 3;
const BASE_FONT = 12;
// Cap so blocks never get distractingly large
const MAX_BLOCK = 14;

function weekCount(data: { date: string }[]) {
  if (data.length === 0) return 53;
  const first = new Date(`${data[0].date}T00:00:00`);
  const last = new Date(`${data[data.length - 1].date}T00:00:00`);
  const pad = first.getDay();
  const days = Math.round((last.getTime() - first.getTime()) / 86_400_000) + 1;
  return Math.ceil((days + pad) / 7);
}

function fitCalendar(width: number, weeks: number) {
  if (width <= 0 || weeks <= 0) {
    return { blockSize: BASE_BLOCK, blockMargin: BASE_MARGIN, blockRadius: 2, fontSize: BASE_FONT };
  }
  const natural = weeks * (BASE_BLOCK + BASE_MARGIN) - BASE_MARGIN;
  // Scale up to fill the container, but never exceed MAX_BLOCK
  const scale = Math.min(width / natural, MAX_BLOCK / BASE_BLOCK);
  const blockSize = BASE_BLOCK * scale;
  const blockMargin = BASE_MARGIN * scale;
  return {
    blockSize,
    blockMargin,
    blockRadius: Math.max(2, blockSize * 0.18),
    fontSize: Math.max(10, Math.round(BASE_FONT * Math.min(1.1, scale))),
  };
}

function useFitCalendar(weeks: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(() => fitCalendar(0, weeks));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setFit(fitCalendar(el.clientWidth, weeks));
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [weeks]);

  return { ref, ...fit };
}

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
  const weeks = Math.max(weekCount(github.contributions), weekCount(cursorContributionDays));
  const { ref, blockSize, blockMargin, blockRadius, fontSize } = useFitCalendar(weeks);

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
          <div ref={ref} className="overflow-x-auto">
            <ActivityCalendar
              data={github.contributions}
              colorScheme="light"
              theme={githubTheme}
              blockSize={blockSize}
              blockMargin={blockMargin}
              blockRadius={blockRadius}
              fontSize={fontSize}
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
              blockSize={blockSize}
              blockMargin={blockMargin}
              blockRadius={blockRadius}
              fontSize={fontSize}
              showTotalCount={false}
              showWeekdayLabels={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
