'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen loading overlay that:
 * • Shows immediately on first paint.
 * • Stays visible for at least `minDuration` ms.
 * • Also waits for window "load" (or an 8s safety timeout), then fades out.
 * • Locks scroll while visible.
 * • Optional once-per-session behavior.
 */
export default function LoadingOverlay({
  gifSrc = '/images/Photon-Loading-Animation.gif',
  backgroundClass = 'bg-white',
  minDuration = 2000, // ← guarantee at least 2s if you want
  oncePerSession = true,
  sessionKey = 'photon:loadedOnce',
  fadeMs = 320, // keep in sync with CSS transition
  maxWaitMs = 8000, // safety valve if 'load' never fires
}) {
  const [render, setRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const timers = useRef([]);
  const active = useRef(true);
  const prevOverflow = useRef('');

  const setT = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    // Skip if we've already shown it this session.
    if (oncePerSession) {
      try {
        if (sessionStorage.getItem(sessionKey) === '1') {
          setRender(false);
          return;
        }
      } catch {
        /* empty */
      }
    }

    // Lock scroll.
    const root = document.documentElement;
    prevOverflow.current = root.style.overflow;
    root.style.overflow = 'hidden';

    // A: wait for the full page load (or a safety timeout)
    const waitForLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          resolve();
        };
        window.addEventListener('load', onLoad);
        setT(resolve, maxWaitMs); // safety
      }
    });

    // B: guarantee minimum display time
    const waitForMin = new Promise(resolve => setT(resolve, minDuration));

    // Hide only after BOTH have completed
    Promise.all([waitForLoad, waitForMin]).then(() => {
      if (!active.current) return;
      setFadeOut(true);
      setT(() => {
        if (!active.current) return;
        setRender(false);
        root.style.overflow = prevOverflow.current;
        try {
          if (oncePerSession) sessionStorage.setItem(sessionKey, '1');
        } catch {
          /* empty */
        }
      }, fadeMs);
    });

    return () => {
      active.current = false;
      // Cleanup timers and restore overflow
      timers.current.forEach(id => clearTimeout(id));
      timers.current = [];
      root.style.overflow = prevOverflow.current;
    };
  }, [minDuration, oncePerSession, sessionKey, fadeMs, maxWaitMs]);

  if (!render) return null;

  return (
    <div
      aria-hidden="true"
      aria-busy="true"
      className={[
        'fixed inset-0 z-[100000]',
        backgroundClass,
        'flex items-center justify-center',
        'transition-opacity duration-300 ease-out',
        'motion-reduce:transition-none',
        fadeOut ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      <img
        src={gifSrc}
        alt="Loading Photon Health…"
        className="h-[15vw] w-[15vw]"
        decoding="async"
      />
    </div>
  );
}
