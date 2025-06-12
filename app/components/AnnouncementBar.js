'use client';
import { pressura } from '@/lib/fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'photon–announcement-dismissed';

const AnnouncementBar = ({ content }) => {
  const [visible, setVisible] = useState(true);

  /* read the flag once the component mounts in the browser */
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setVisible(false);
    }
  }, []);

  /* click handler */
  function handleClose() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }

  if (!visible) return null; // nothing to render

  return (
    <div
      className={clsx(
        'announcement-bar align-center absolute left-0 top-0 z-[1000] w-full bg-black py-[11px]',
        !visible && 'hidden h-0',
      )}
    >
      <a
        href="#"
        className={clsx(
          'flex w-full items-center justify-center gap-4 text-sm uppercase text-white',
          pressura.className,
        )}
      >
        {content}
        <span className="text-[var(--seafoam)]">
          Read More <i>→</i>
        </span>
      </a>
      <button
        aria-label="Close announcement"
        onClick={handleClose}
        className="absolute right-4 top-2 z-[1001] p-2"
      >
        <Image width={10} height={10} src="/icons/x.svg" alt="x icon" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
