'use client';

import ContentfulImage from '@/app/components/contentful-image';
import RichText from '@/app/components/RichText';
import { BLOCKS } from '@contentful/rich-text-types';
import clsx from 'clsx';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const DURATION = 8000; // 8 s between slides
const FADE_MS = 700; // testimonial fade duration

export default function Testimonials({ className, titleStyles, items = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // ← track hover with state

  const wrapperRef = useRef(null);
  const contentRefs = useRef([]);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());
  const remainingRef = useRef(DURATION);

  /* ── Timer helpers ─────────────────────────────────────────────── */
  const clear = () => clearTimeout(timerRef.current);
  const restart = useCallback(
    (delay = DURATION) => {
      clear();
      startRef.current = Date.now();
      remainingRef.current = delay;

      timerRef.current = setTimeout(
        () => setIndex(i => (i + 1) % items.length),
        delay,
      );
    },
    [items.length],
  );

  /* ── Auto-advance whenever index changes (unless paused) ───────── */
  useEffect(() => {
    if (!paused && items.length > 1) restart();
    return clear;
  }, [index, items.length, paused, restart]);

  /* ── Smooth wrapper height when quote lengths differ ───────────── */
  useLayoutEffect(() => {
    const el = contentRefs.current[index];
    if (wrapperRef.current && el) {
      wrapperRef.current.style.height = `${el.offsetHeight}px`;
    }
  }, [index, items]);

  /* ── Hover pause / resume logic ────────────────────────────────── */
  const pause = () => {
    if (items.length < 2) return;
    const elapsed = Date.now() - startRef.current;
    remainingRef.current = Math.max(DURATION - elapsed, 0);
    setPaused(true);
    clear();
  };

  const resume = () => {
    if (items.length < 2) return;
    setPaused(false);
    restart(remainingRef.current || DURATION);
  };

  /* ── Manual nav keeps timing in sync ───────────────────────────── */
  const go = i => {
    setIndex(i);
    if (!paused) restart();
  };

  if (!items.length) return null;

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <section
      className={clsx(className, paused && 'paused')}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="l-container l-container--testimonials relative rounded-[16px] bg-white pb-[40px] md:px-[50px]">
        {/* Height-animating wrapper */}
        <div
          ref={wrapperRef}
          className="mx-auto overflow-hidden transition-[height] duration-700 ease-in-out"
        >
          {items.map((t, i) => {
            return (
              <article
                key={i}
                aria-hidden={i !== index}
                className={clsx(
                  'absolute inset-0 flex flex-col',
                  'transition-opacity',
                  `duration-${FADE_MS}`,
                  i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                {/* Inner content we measure for height */}
                <div
                  ref={el => (contentRefs.current[i] = el)}
                  className="flex flex-col items-center px-5 pt-[40px]"
                >
                  {/* ── Author row ── */}
                  <header className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                    <div className="flex flex-row-reverse items-center">
                      {t?.logo && (
                        <ContentfulImage
                          src={t.logo.url}
                          alt={`${t.name} logo`}
                          width={40}
                          height={40}
                          className="relative z-0 h-[40px] w-[40px] overflow-hidden rounded-lg object-contain"
                          draggable={false}
                        />
                      )}
                      <ContentfulImage
                        src={t.image.url}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="z-1 relative h-[50px] w-[50px] rounded-full border-white object-cover ring-4 ring-white"
                        draggable={false}
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[18px] font-semibold sm:text-[16px]">
                        {t.name}
                      </p>
                      <p className="text-sm text-gray-500">{t.jobTitle}</p>
                    </div>
                  </header>

                  {/* ── Quote ── */}
                  <blockquote className="richText mx-auto max-w-[860px] text-center leading-snug text-black">
                    <RichText
                      document={t.testimonial.json}
                      options={{
                        renderNode: {
                          [BLOCKS.PARAGRAPH]: (_, children) => (
                            <p
                              className={clsx(
                                titleStyles ??
                                  'mb-[40px] text-[21px] lg:text-[38px]',
                              )}
                            >
                              {children}
                            </p>
                          ),
                        },
                      }}
                    />
                  </blockquote>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Controls ── */}
        {items.length > 1 && (
          <div className="mt-2 flex flex-col items-center gap-4">
            {/* Next arrow with progress ring */}
            <button
              onClick={() => go((index + 1) % items.length)}
              aria-label="Next testimonial"
              className="testimonials__arrow-button relative h-12 w-12 rounded-full"
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
                <circle
                  className="opacity-20"
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#70707033"
                  strokeWidth="2"
                />
                <circle
                  key={index} /* restart anim each slide */
                  className="progress-ring"
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="2"
                  strokeDasharray="126"
                  strokeDashoffset="126"
                  style={{
                    animation: `dash ${DURATION}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              </svg>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Dot navigation */}
            <div className="relative z-10 mt-4 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={clsx(
                    '-mx-1 h-2 rounded-full p-2 transition-colors',
                    i === index ? 'mr-1 w-[24px]' : 'w-2',
                  )}
                >
                  <span
                    className={clsx(
                      'block h-2 rounded-full transition-colors',
                      i === index
                        ? 'w-[24px] bg-[var(--seafoam)]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Keyframes + fallback paused styling ── */}
        <style jsx>{`
          @keyframes dash {
            from {
              stroke-dashoffset: 126;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          /* fallback in case inline play-state isn’t applied */
          .paused .progress-ring {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
