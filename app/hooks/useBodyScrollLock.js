'use client';
import { useLayoutEffect, useRef } from 'react';

/**
 * Locks page scroll while `active` is true, adds a body class,
 * and restores the previous scroll position on cleanup.
 */
export function useBodyScrollLock(active, className = 'mobile-nav-open') {
  const savedY = useRef(0); // persists between renders

  useLayoutEffect(() => {
    if (!active || typeof document === 'undefined') return; // run ONLY when locking

    const body = document.body;
    savedY.current = window.scrollY;

    // ----- lock -----
    body.style.position = 'fixed';
    body.style.top = `-${savedY.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.classList.add(className);

    // ----- unlock (cleanup) -----
    return () => {
      body.style.position =
        body.style.top =
        body.style.left =
        body.style.right =
        body.style.width =
          '';
      body.classList.remove(className);
      window.scrollTo(0, savedY.current);
    };
  }, [active, className]);
}
