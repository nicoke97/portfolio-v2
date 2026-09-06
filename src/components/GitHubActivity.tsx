"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

import { ACTIVITY_START, githubGreens, site } from "@/data/site";
import type { GithubContributions } from "@/lib/github-contributions";

const activityTheme = { light: [...githubGreens] };

const BASE_BLOCK = 11;
const BASE_MARGIN = 3;
const BASE_FONT = 12;
const MAX_BLOCK = 22;

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
  const scale = Math.min(width / natural, MAX_BLOCK / BASE_BLOCK);
  const blockSize = BASE_BLOCK * scale;
  const blockMargin = BASE_MARGIN * scale;
  return {
    blockSize,
    blockMargin,
    blockRadius: Math.max(1, blockSize * 0.1),
    fontSize: Math.max(11, Math.round(BASE_FONT * Math.min(1, scale))),
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

function emptyGithub(): GithubContributions {
  const end = new Date();
  const start = new Date(`${ACTIVITY_START}T00:00:00`);
  const contributions: GithubContributions["contributions"] = [];
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  while (cursor <= end) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    contributions.push({ date: `${year}-${month}-${day}`, count: 0, level: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return { total: 0, contributions, includesPrivate: false };
}

export function GitHubActivity() {
  const [github, setGithub] = useState<GithubContributions>(emptyGithub);
  const [loaded, setLoaded] = useState(false);
  const weeks = weekCount(github.contributions);
  const { ref, blockSize, blockMargin, blockRadius, fontSize } = useFitCalendar(weeks);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/contributions")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: GithubContributions | null) => {
        if (cancelled) return;
        if (payload?.contributions.length) setGithub(payload);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const countLabel = loaded ? `${github.total.toLocaleString()} commits` : "—";

  return (
    <section className="border-t border-foreground/10 pt-8 pb-24 sm:pt-12">
      <h4 className="mb-6 sm:mb-8">Activity</h4>

      <div className="max-w-[39rem]">
        <div className="mb-3 flex items-start justify-between gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="github"
            className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
          >
            GitHub
          </a>
          <h4 className={`shrink-0 text-right ${loaded ? "" : "opacity-30"}`}>{countLabel}</h4>
        </div>

        <div
          ref={ref}
          className={`activity-calendar w-full ${loaded ? "opacity-100" : "opacity-40"} transition-opacity duration-300`}
        >
          <ActivityCalendar
            data={github.contributions}
            colorScheme="light"
            theme={activityTheme}
            blockSize={blockSize}
            blockMargin={blockMargin}
            blockRadius={blockRadius}
            fontSize={fontSize}
            showTotalCount={false}
            showColorLegend={false}
            showWeekdayLabels={false}
          />
        </div>
      </div>
    </section>
  );
}
