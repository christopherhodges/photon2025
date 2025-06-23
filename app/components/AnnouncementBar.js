'use client';
import { pressura } from '@/lib/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'photon–announcement-dismissed';
const BODY_CLASS = 'has-announcement';

export default function AnnouncementBar({ content }) {
  const [visible, setVisible] = useState(null); // "null" until checked

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const shouldShow = !dismissed;
    setVisible(shouldShow);

    // Set or remove global body class
    if (shouldShow) {
      document.body.classList.add(BODY_CLASS);
    } else {
      document.body.classList.remove(BODY_CLASS);
    }
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    document.body.classList.remove(BODY_CLASS);
  }

  if (visible === null || !visible) return null;

  return (
    <div className="announcement-bar absolute left-0 top-0 z-[1000] w-full bg-black py-[11px]">
      <a
        href="/announcement"
        className={clsx(
          'flex w-full items-center justify-center gap-4 text-sm uppercase text-white',
          pressura.className,
        )}
      >
        {content}
        <span className="text-[var(--seafoam)]">
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
