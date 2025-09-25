'use client';

import clsx from 'clsx';
import { useState } from 'react';

/** Fixed order that matches your design */
const ORDERED_CATEGORIES = ['Development', 'Design', 'Account', 'Sales'];

export default function JobListings({ jobs = [], className = '' }) {
  /** Group once (no network calls, no effects) */
  const groups = jobs.reduce((acc, job) => {
    const cat = job.jobCategory || 'Other';
    acc[cat] = acc[cat] ? [...acc[cat], job] : [job];
    return acc;
  }, {});

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
                  View Opening
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
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
