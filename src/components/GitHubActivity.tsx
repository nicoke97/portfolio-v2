"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

import {
  cursorActivity,
  cursorContributionDays,
  cursorOranges,
  githubGreens,
} from "@/data/site";

const githubTheme = { light: [...githubGreens] };
const cursorTheme = { light: [...cursorOranges] };
const githubLabels = { totalCount: "{{count}} contributions on GitHub in the last year" };
const cursorLabels = {
  totalCount: "Local AI edits",
  legend: { less: "Less", more: "More" },
};

export function GitHubActivity() {
  const [data, setData] = useState<Activity[] | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((response) => response.json())
      .then((payload: { total: number; contributions: Activity[] }) => {
        setData(payload.contributions);
        setTotal(payload.total);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return (
    <section>
      <div className="mb-10 border-t border-foreground/10 pt-8">
        <h4>Activity</h4>
      </div>

      <div className="mx-auto w-full max-w-[900px] pb-4">

        <div className="border border-foreground/10 px-5 py-5">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
                GitHub
              </p>
              <p className="mt-1 text-[28px] font-medium tracking-tight tabular-nums text-foreground">
                {total.toLocaleString()}
                <span className="ml-2 text-[13px] font-medium tracking-normal text-foreground-light">
                  contributions this year
                </span>
              </p>
            </div>
          </div>

          <div className="no-scrollbar flex justify-center overflow-x-auto">
            {data ? (
              <ActivityCalendar
                data={data}
                colorScheme="light"
                theme={githubTheme}
                labels={githubLabels}
                blockSize={11}
                blockMargin={3}
                fontSize={12}
              />
            ) : (
              <div className="h-28 w-full max-w-[800px] animate-pulse bg-foreground/[0.04]" />
            )}
          </div>
        </div>

        <div className="mt-6 border border-foreground/10 px-5 py-5">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-medium tracking-[0.08em] text-foreground-light uppercase">
                Cursor
              </p>
              <p className="mt-1 text-[28px] font-medium tracking-tight tabular-nums text-primary">
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

          <div className="flex justify-center">
            <ActivityCalendar
              data={cursorContributionDays}
              colorScheme="light"
              theme={cursorTheme}
              labels={cursorLabels}
              blockSize={11}
              blockMargin={3}
              fontSize={12}
              showWeekdayLabels={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
