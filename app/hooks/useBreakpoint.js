'use client';
import { useEffect, useState } from 'react';

/**
 * Returns true if the viewport currently matches the query.
 * @param {string} query CSS media-query string, e.g. "(max-width: 639px)"
 */
export function useBreakpoint(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler(); // sync once on mount
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
