'use client';

import clsx from 'clsx';
import { useState } from 'react';

/** Fixed order that matches your design */

export default function JobListings({ jobs = [], className = '' }) {
  /** Group once (no network calls, no effects) */
  const groups = jobs.reduce((acc, job) => {
    const cat = job.jobCategory || 'Other';
    acc[cat] = acc[cat] ? [...acc[cat], job] : [job];
    return acc;
  }, {});

  const ORDERED_CATEGORIES = Object.keys(groups).sort();

  return (
    <section className={clsx(className)}>
      {ORDERED_CATEGORIES.map(cat => (
        <Accordion
          key={cat}
          title={cat}
          items={groups[cat] ?? []}
          count={groups[cat]?.length ?? 0}
        />
      ))}
    </section>
  );
}

/* ── Accordion sub-component — unchanged ───────────────────────── */
function Accordion({ title, items, count }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2 rounded-lg bg-white">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-normal">{title}</span>
          <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
            {count}
          </span>
        </div>

        <div>
          {open ? (
            /* minus symbol */
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14" />
            </svg>
          ) : (
            /* plus symbol */
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </div>
      </button>

      {open && (
        <ul className="space-y-6 px-4 pb-6 text-[16px]">
          {items.map(job => (
            <li key={job.sys.id}>
              <div className="mb-2 flex items-center justify-between border-t pt-4">
                <h3 className="text-base font-normal">{job.jobTitle}</h3>

                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium underline-offset-2 hover:underline"
                >
                  Apply
                  <svg
                    className="ml-2"
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.464 0.263977H0.536012C0.403695 0.263977 0.276797 0.319168 0.183234 0.417408C0.089672 0.515649 0.0371094 0.648892 0.0371094 0.787825C0.0371094 0.926758 0.089672 1.06 0.183234 1.15824C0.276797 1.25648 0.403695 1.31167 0.536012 1.31167H9.26225L0.185506 10.8423C0.139357 10.8907 0.10275 10.9482 0.0777743 11.0116C0.0527988 11.0749 0.0399437 11.1427 0.0399437 11.2112C0.0399437 11.2798 0.0527988 11.3476 0.0777743 11.4109C0.10275 11.4743 0.139357 11.5318 0.185506 11.5802C0.231654 11.6287 0.286441 11.6671 0.346737 11.6933C0.407033 11.7196 0.471658 11.7331 0.536922 11.7331C0.602186 11.7331 0.666811 11.7196 0.727108 11.6933C0.787404 11.6671 0.84219 11.6287 0.888339 11.5802L9.96509 2.04869V11.2122C9.96509 11.3511 10.0176 11.4844 10.1112 11.5826C10.2048 11.6809 10.3317 11.736 10.464 11.736C10.5963 11.736 10.7232 11.6809 10.8168 11.5826C10.9103 11.4844 10.9629 11.3511 10.9629 11.2122V0.785913C10.9619 0.647467 10.909 0.515006 10.8156 0.417286C10.7222 0.319567 10.5958 0.264477 10.464 0.263977Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>

              <p className="mb-4 text-sm text-gray-700">
                <span className="font-normal">Location:</span>{' '}
                {job.jobLocation || '—'} <br />
                <span className="font-normal">Level:</span>{' '}
                {job.jobLevel || '—'}
              </p>

              {job.shortDescription && <p>{job.shortDescription}</p>}
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-sm text-gray-500">No openings right now.</li>
          )}
        </ul>
      )}
    </div>
  );
}
