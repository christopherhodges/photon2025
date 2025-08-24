'use client';

import ContentfulImage from '@/app/components/contentful-image';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ContentSlider({ items = [] }) {
  const [index, setIndex] = useState(0);
  const len = items.length;

  const sliderRef = useRef(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);
  const lastSwipeTimeRef = useRef(0);
  const pointerTypeRef = useRef('mouse');

  /* ---------- helpers ---------- */

  /** map absolute slide index to visible offset (-2..2 typically) */
  const getOffset = i => {
    let diff = i - index;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  /** go to previous / next safely modulo length */
  const go = useCallback(dir => setIndex(i => (i + dir + len) % len), [len]);

  /* ---------- drag / swipe behaviour ---------- */
  useEffect(() => {
    // nothing to do with a single slide
    if (len < 2) return;
    const slider = sliderRef.current;
    if (!slider) return;

    function onPointerDown(e) {
      // left-click or touch only
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      draggingRef.current = true;
      startXRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      startYRef.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      slider.classList.add('cursor-grabbing');
    }

    // function onPointerMove() {
    //   if (!draggingRef.current)
    //
    //   // optional live-drag preview (commented)
    //   // const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    //   // const delta = x - startXRef.current;
    //   // slider.style.setProperty('--drag-x', delta + 'px');
    // }

    function endDrag(e) {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      slider.classList.remove('cursor-grabbing');

      // slider.style.removeProperty('--drag-x'); // if live-drag enabled

      const now = Date.now();
      if (now - lastSwipeTimeRef.current < 300) return; // debounce 300 ms
      lastSwipeTimeRef.current = now;

      const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
      const endY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;

      const dx = endX - startXRef.current;
      const dy = endY - startYRef.current;

      // bail if mostly vertical movement
      if (Math.abs(dx) < Math.abs(dy)) return;
      pointerTypeRef.current = e.pointerType || 'mouse';

      // dynamic threshold: 15 % of width or ≥ 60 px
      const pct = pointerTypeRef.current === 'touch' ? 0.12 : 0.08; // 12 % vs 8 %
      const minPx = 40;
      const threshold = Math.max(minPx, slider.offsetWidth * pct);

      if (Math.abs(dx) > threshold) {
        go(dx < 0 ? +1 : -1); // swipe left → next | right → prev
      }
    }

    /* listeners */
    slider.addEventListener('pointerdown', onPointerDown);
    // slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    slider.addEventListener('pointerleave', endDrag);

    // passive touch* needed to keep scroll smooth
    slider.addEventListener('touchstart', onPointerDown, { passive: true });
    // slider.addEventListener('touchmove', onPointerMove, { passive: true });
    slider.addEventListener('touchend', endDrag);

    return () => {
      slider.removeEventListener('pointerdown', onPointerDown);
      // slider.removeEventListener('pointermove', onPointerMove);
      slider.removeEventListener('pointerup', endDrag);
      slider.removeEventListener('pointercancel', endDrag);
      slider.removeEventListener('pointerleave', endDrag);
      slider.removeEventListener('touchstart', onPointerDown);
      // slider.removeEventListener('touchmove', onPointerMove);
      slider.removeEventListener('touchend', endDrag);
    };
  }, [len, go]); // len is stable unless slide list changes

  /* ---------- render ---------- */
  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-6xl">
      {/* ----- Slides (stacked) ----- */}
      <div
        ref={sliderRef}
        className={clsx(
          'relative h-[450px] cursor-grab select-none sm:h-[540px]',
        )}
        style={{ perspective: '1440px' }}
      >
        {items.map((item, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null; // hide distant slides

          const scale = offset === 0 ? 1 : 0.75;
          const translateX = offset * 70;
          const rotate = offset === 0 ? 0 : offset < 0 ? 38 : -38;
          return (
            <a
              target={item.externalLink ? '_blank' : ''}
              href={item.externalLink || '/case-studies/' + item.slug}
              key={item.sys.id}
              onClick={() => setIndex(i)}
              className="featured-case-study group absolute left-1/2 top-1/2 h-[calc(100vw-20px)] max-h-[402px] w-[calc(100vw-40px)] max-w-[720px] outline-none sm:max-h-[540px]"
              style={{
                transform: `translate(calc(-50% + ${translateX}%), -50%) scale(${scale}) rotateY(${rotate}deg)`,
                transition: 'transform 400ms cubic-bezier(.4,0,.2,1)',
                transformStyle: 'preserve-3d',
                zIndex: offset === 0 ? 30 : 20 - Math.abs(offset),
              }}
            >
              <ContentfulImage
                src={item.coverImage.url}
                alt={item.coverImage.title}
                draggable={false}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 90vw, 720px"
                priority={offset === 0}
              />

              {/* overlay gradient + details (only on active) */}
              {offset === 0 && (
                <>
                  {item.logo && (
                    <ContentfulImage
                      src={item.logo.url}
                      alt={item.logo.title}
                      width={item.logo.width}
                      height={item.logo.height}
                      className="absolute left-1/2 top-1/2 w-full max-w-[75%] -translate-x-1/2 -translate-y-1/2 sm:max-w-[412px]"
                      sizes="(max-width: 768px) 90vw, 720px"
                      draggable={false}
                      priority
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-[95%] items-center justify-between rounded-b-xl bg-white/[.1] p-[20px] text-left backdrop-blur-[5px] sm:translate-y-0 sm:p-6">
                    {item.featuredLinkTitle && (
                      <p className="max-w-[144px] text-[15px] text-white sm:max-w-none sm:text-xl">
                        {item.featuredLinkTitle}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-sm text-white group-hover:underline">
                      Case&nbsp;Study
                      <Image
                        width={12}
                        height={12}
                        src="/icons/arrow-right-up.svg"
                        className="h-[12px] w-[12px]"
                        alt="Arrow Right up"
                      />
                    </span>
                  </div>
                </>
              )}
            </a>
          );
        })}
      </div>

      {/* ----- Dot nav ----- */}
      <div className="mt-[80px] flex justify-center gap-2 sm:mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group -mx-1 inline-flex items-center justify-center p-2"
          >
            <span
              className={clsx(
                'block h-2 w-2 rounded-full transition-colors',
                i === index
                  ? 'bg-[var(--seafoam)]'
                  : 'bg-white/30 group-hover:bg-white/60',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
