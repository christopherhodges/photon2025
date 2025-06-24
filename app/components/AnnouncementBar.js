'use client';
import { pressura } from '@/lib/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'photon–announcement-dismissed';
const BODY_CLASS_VISIBLE = 'has-announcement';
const BODY_CLASS_SCROLLED_PAST = 'scrolled-past-announcement';

export default function AnnouncementBar({ content }) {
  const [visible, setVisible] = useState(null);
  const barRef = useRef(null);

  // Set initial visibility and class
  useEffect(() => {
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
  }, []);

  // Track scroll to toggle scrolled-past-announcement class
  useEffect(() => {
    if (!visible) return;

    function onScroll() {
      const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
      const hasScrolledPast = barBottom <= 0;

      if (hasScrolledPast) {
        document.body.classList.add(BODY_CLASS_SCROLLED_PAST);
      } else {
        document.body.classList.remove(BODY_CLASS_SCROLLED_PAST);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check immediately in case user is already scrolled

    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    document.body.classList.remove(BODY_CLASS_VISIBLE);
    document.body.classList.remove(BODY_CLASS_SCROLLED_PAST);
  }

  if (visible === null || !visible) return null;

  return (
    <div
      ref={barRef}
      className="announcement-bar left-0 top-0 z-[1000] flex w-full justify-center bg-black py-[11px] hover:bg-[#001740]"
    >
      <a
        href="/announcement"
        className={clsx(
          'group inline-flex items-center justify-center gap-4 text-sm uppercase text-white',
          pressura.className,
        )}
      >
        {content}
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
