"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

import {
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

const DESKTOP_BLOCK = 11;
const DESKTOP_MARGIN = 3;
const DESKTOP_FONT = 12;

function weekCount(data: { date: string }[]) {
  if (data.length === 0) return 53;
  const first = new Date(`${data[0].date}T00:00:00`);
  const last = new Date(`${data[data.length - 1].date}T00:00:00`);
  const pad = first.getDay();
  const days = Math.round((last.getTime() - first.getTime()) / 86_400_000) + 1;
  return Math.ceil((days + pad) / 7);
}

function fitCalendar(width: number, weeks: number) {
  const natural = weeks * (DESKTOP_BLOCK + DESKTOP_MARGIN) - DESKTOP_MARGIN;
  if (width <= 0 || weeks <= 0 || width >= natural) {
    return { blockSize: DESKTOP_BLOCK, blockMargin: DESKTOP_MARGIN, fontSize: DESKTOP_FONT };
  }

  const scale = width / natural;
  return {
    blockSize: DESKTOP_BLOCK * scale,
    blockMargin: DESKTOP_MARGIN * scale,
    fontSize: Math.max(8, Math.round(DESKTOP_FONT * scale)),
  };
}

function useFitCalendar(weeks: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(() => fitCalendar(900, weeks));

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
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1);
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
  const { ref, blockSize, blockMargin, fontSize } = useFitCalendar(weeks);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/contributions")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: GithubContributions | null) => {
        if (!cancelled && payload?.total) setGithub(payload);
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

      <div className="activity-fit mx-auto w-full max-w-[900px] pb-4">
        <div className="border border-foreground/10 px-3 py-4 sm:px-5 sm:py-5">
          <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
                GitHub
              </p>
              <p className="mt-1 text-[24px] font-medium tracking-tight tabular-nums text-foreground sm:text-[28px]">
                {github.total.toLocaleString()}
                <span className="ml-2 text-[13px] font-medium tracking-normal text-foreground-light">
                  contributions this year
                </span>
              </p>
            </div>
          </div>

          <div ref={ref} className="w-full min-w-0">
            <ActivityCalendar
              data={github.contributions}
              colorScheme="light"
              theme={githubTheme}
              blockSize={blockSize}
              blockMargin={blockMargin}
              fontSize={fontSize}
              showTotalCount={false}
              showWeekdayLabels={false}
            />
          </div>
        </div>

        <div className="mt-6 border border-foreground/10 px-3 py-4 sm:px-5 sm:py-5">
          <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
                Cursor
              </p>
              <p className="mt-1 text-[24px] font-medium tracking-tight tabular-nums text-primary sm:text-[28px]">
                {cursorActivity.lineEdits.toLocaleString()}
                <span className="ml-2 text-[13px] font-medium tracking-normal text-foreground-light">
                  AI line edits
                </span>
              </p>
            </div>
            <p className="text-[12px] text-foreground-light">
              Most active {cursorActivity.mostActiveMonth} · {cursorActivity.longestStreakDays}d
              longest streak
            </p>
          </div>

          <div className="w-full min-w-0">
            <ActivityCalendar
              data={cursorContributionDays}
              colorScheme="light"
              theme={cursorTheme}
              labels={cursorLabels}
              blockSize={blockSize}
              blockMargin={blockMargin}
              fontSize={fontSize}
              showWeekdayLabels={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
