'use client';
import { pressura } from '@/lib/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'photon–announcement-dismissed';
const BODY_CLASS_VISIBLE = 'has-announcement';
const BODY_CLASS_SCROLLED_PAST = 'scrolled-past-announcement';

export default function AnnouncementBar({
  text,
  link,
  showOnSite = false, // ⇦ flag from Contentful / parent
}) {
  const [visible, setVisible] = useState(false); // start hidden
  const barRef = useRef(null);

  /** Decide whether the bar should be visible at all */
  useEffect(() => {
    // If this page says “don’t show”, hide and clean up
    if (!showOnSite) {
      setVisible(false);
      document.body.classList.remove(BODY_CLASS_VISIBLE);
      document.body.classList.remove(BODY_CLASS_SCROLLED_PAST);
      return;
    }

    // Otherwise respect the “dismissed in this session?” cookie
    const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const shouldShow = !dismissed;
    setVisible(shouldShow);

    if (shouldShow) {
      document.body.classList.add(BODY_CLASS_VISIBLE);
    } else {
      document.body.classList.remove(BODY_CLASS_VISIBLE);
    }

    return () => {
      document.body.classList.remove(BODY_CLASS_VISIBLE);
      document.body.classList.remove(BODY_CLASS_SCROLLED_PAST);
    };
  }, [showOnSite]); // ⇦ rerun if the flag changes

  /** Toggle BODY_CLASS_SCROLLED_PAST while the bar is visible */
  useEffect(() => {
    if (!visible) return;

    const onScroll = () => {
      const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
      const hasScrolledPast = barBottom <= 0;

      document.body.classList.toggle(BODY_CLASS_SCROLLED_PAST, hasScrolledPast);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once immediately
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    document.body.classList.remove(BODY_CLASS_VISIBLE);
    document.body.classList.remove(BODY_CLASS_SCROLLED_PAST);
  };

  if (!visible) return null; // Nothing to paint

  return (
    <div
      ref={barRef}
      className="announcement-bar left-0 top-0 z-[1000] flex w-full justify-center bg-black py-[11px] hover:bg-[#001740]"
    >
      <a
        target="_blank"
        href={link}
        className={clsx(
          'group inline-flex items-center justify-center gap-4 text-sm uppercase text-white',
          pressura.className,
        )}
      >
        {text}
        <span className="text-[var(--seafoam)] group-hover:underline">
          Read&nbsp;More&nbsp;<i>→</i>
        </span>
      </a>

      <button
        aria-label="Close announcement"
        onClick={handleClose}
        className="absolute right-4 top-2 z-[1001] p-2"
      >
        <Image src="/icons/x.svg" alt="" width={10} height={10} />
      </button>
    </div>
  );
}
