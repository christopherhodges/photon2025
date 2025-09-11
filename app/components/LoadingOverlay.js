'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function LoadingOverlay({
  gifSrc = '/images/Photon-Loading-Animation.gif',
  backgroundClass = 'bg-[#001740]',
  minDuration = 2000,
  oncePerSession = true,
  sessionKey = 'photon:loadedOnce',
  fadeMs = 620,
  maxWaitMs = 8000,
}) {
  const [render, setRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const timers = useRef([]);
  const active = useRef(true);
  const prevOverflow = useRef('');
  const overlayRef = useRef(null);

  const setT = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const finish = useCallback(() => {
    if (!active.current) return;
    const root = document.documentElement;
    root.style.overflow = prevOverflow.current;
    try {
      if (oncePerSession) sessionStorage.setItem(sessionKey, '1');
    } catch {
      /* empty */
    }
    setRender(false);
  }, [active, sessionKey, oncePerSession]);

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

    // A) Wait for full page load (or safety timeout)
    const waitForLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          resolve();
        };
        window.addEventListener('load', onLoad);
        setT(resolve, maxWaitMs);
      }
    });

    // B) Guarantee minimum display time
    const waitForMin = new Promise(resolve => setT(resolve, minDuration));

    // Hide after BOTH complete
    Promise.all([waitForLoad, waitForMin]).then(() => {
      if (!active.current) return;
      setFadeOut(true);

      // Fallback: if transitionend doesn't fire, remove after fadeMs+50
      setT(finish, fadeMs + 50);
    });

    return () => {
      active.current = false;
      timers.current.forEach(id => clearTimeout(id));
      timers.current = [];
      root.style.overflow = prevOverflow.current;
    };
  }, [minDuration, oncePerSession, sessionKey, fadeMs, maxWaitMs, finish]);

  if (!render) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      aria-busy="true"
      className={[
        'fixed inset-0 z-[100000]',
        backgroundClass,
        'flex items-center justify-center',
        'transition-opacity ease-out',
        'motion-reduce:transition-none',
        fadeOut ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
      // Match the CSS transition duration to fadeMs
      style={{ transitionDuration: `${fadeMs}ms` }}
      onTransitionEnd={e => {
        // Only finish when the overlay's opacity transition completes
        if (
          e.target === e.currentTarget &&
          e.propertyName === 'opacity' &&
          fadeOut
        ) {
          finish();
        }
      }}
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
