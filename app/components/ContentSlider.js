'use client';

import ContentfulImage from '@/app/components/contentful-image';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export default function ContentSlider({ items = [] }) {
  const [index, setIndex] = useState(0);
  const len = items.length;

  /** given a slide’s absolute index, return its visual offset from centre */
  const getOffset = i => {
    let diff = i - index;
    // wrap so we can go both directions
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff; // -∞ .. +∞ but usually -2..2
  };

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-6xl">
      {/* ---------- Slides (absolute stacked) ---------- */}
      <div className="relative h-[540px]" style={{ perspective: '1440px' }}>
        {items.map((item, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null; /* hide the rest */

          const scale = offset === 0 ? 1 : 0.75;
          const translateX = offset * 70; /* 0, ±40%, ±80% */

          const rotate = offset === 0 ? 0 : offset < 0 ? 38 : -38; // flip sign for sides

          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="absolute left-1/2 top-1/2 h-[540px] w-[720px] cursor-pointer outline-none"
              style={{
                transform: `translate(calc(-50% + ${translateX}%), -50%) scale(${scale}) rotateY(${rotate}deg) `,
                transition: 'transform 400ms cubic-bezier(.4,0,.2,1)',
                transformStyle: 'preserve-3d',
                zIndex: offset === 0 ? 30 : 20 - Math.abs(offset),
              }}
            >
              <ContentfulImage
                src={item.coverImage.url}
                alt={item.featuredLinkTitle}
                fill
                className={clsx('rounded-xl object-cover')}
                sizes="(max-width: 768px) 90vw, 720px"
                priority={offset === 0}
              />

              {/* overlay gradient + details (only on active) */}
              {offset === 0 && (
                <>
                  <ContentfulImage
                    src={item.logo.url}
                    alt={item.logo.title}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="absolute left-1/2 top-1/2 max-w-[412px] -translate-x-1/2 -translate-y-1/2"
                    sizes="(max-width: 768px) 90vw, 720px"
                    priority={offset === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-xl bg-white/[.1] p-6 text-left backdrop-blur-[5px]">
                    <p className="text-xl text-white">
                      {item.featuredLinkTitle}
                    </p>
                    <a
                      href={item.externalLink || item.slug}
                      className="inline-flex items-center gap-2 text-sm text-white hover:underline"
                    >
                      Case&nbsp;Study
                      <Image
                        width={12}
                        height={12}
                        src="/icons/arrow-right-up.svg"
                        className="h-[12px] w-[12px]"
                        alt="Arrow Right up"
                      />
                    </a>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* ---------- Dot navigation ---------- */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={clsx(
              'h-2 w-2 rounded-full transition-colors',
              i === index
                ? 'bg-[var(--seafoam)]'
                : 'bg-white/30 hover:bg-white/60',
            )}
          />
        ))}
      </div>
    </div>
  );
}
