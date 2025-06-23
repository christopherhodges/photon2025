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

const DURATION = 8000; // 8s
const FADE_MS = 700;

export default function Testimonials({ titleStyles, items = [] }) {
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef(null);
  const contentRefs = useRef([]); // will point at the inner content divs
  const timerRef = useRef(null);

  // ─── Auto-advance ───────────────────────────────────────────────────────
  const restart = useCallback(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(
      () => setIndex(i => (i + 1) % items.length),
      DURATION,
    );
  }, [items.length]);
  useEffect(() => {
    if (items.length > 1) restart();

    return () => clearTimeout(timerRef.current);
  }, [index, items.length, restart]);

  // ─── Height adjustment ──────────────────────────────────────────────────
  useLayoutEffect(() => {
    const contentEl = contentRefs.current[index];
    if (wrapperRef.current && contentEl) {
      // set wrapper to exactly the inner content’s height
      wrapperRef.current.style.height = `${contentEl.offsetHeight}px`;
    }
  }, [index, items]);

  if (!items.length) return null;

  const go = i => {
    setIndex(i);
    restart();
  };

  return (
    <section className="p-[20px] lg:p-[40px]">
      <div className="l-container l-container--testimonials relative rounded-[8px] bg-white px-[50px] pb-[40px] md:rounded-[16px]">
        {/* ─── Wrapper that animates height ─────────────────────────────── */}
        <div
          ref={wrapperRef}
          className="mx-auto overflow-hidden transition-[height] duration-700 ease-in-out"
        >
          {items.map((t, i) => (
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
              {/* ─── Inner padded container that we measure ───────────── */}
              <div
                ref={el => (contentRefs.current[i] = el)}
                className="flex flex-col items-center px-5 pt-[40px]"
              >
                {/* author row */}
                <header className="mb-8 flex items-center justify-center gap-4">
                  <div className="flex flex-row-reverse items-center">
                    {t.logo && (
                      <ContentfulImage
                        src={t.logo.url}
                        alt={`${t.name} logo`}
                        width={40}
                        height={40}
                        className="relative z-0 h-[40px] w-[40px] overflow-hidden rounded-lg object-contain"
                      />
                    )}
                    <ContentfulImage
                      src={t.image.url}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="z-1 relative h-[50px] w-[50px] rounded-full border-white object-cover ring-4 ring-white"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.jobTitle}</p>
                  </div>
                </header>
                {/* quote */}
                <blockquote className="richText mx-auto max-w-[860px] text-center leading-snug text-black">
                  <RichText
                    document={t.testimonial.json}
                    options={{
                      renderNode: {
                        [BLOCKS.PARAGRAPH]: (_, children) => (
                          <p
                            className={clsx(
                              titleStyles ??
                                'mb-[40px] text-[21px] md:text-[38px]',
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
          ))}
        </div>

        {/* 2️⃣ Controls (outside the height-animating div) */}
        {items.length > 1 && (
          <div className="mt-2 flex flex-col items-center gap-4">
            {/* Next Arrow + Progress Ring */}
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
                  key={index} // restart anim on change
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
                  ></span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* keyframes for the ring */}
        <style jsx>{`
          @keyframes dash {
            from {
              stroke-dashoffset: 126;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
