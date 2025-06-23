'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BodyClass() {
  const pathname = usePathname(); // e.g. "/about-us"

  useEffect(() => {
    // turn "/" → "home", "/posts/first" → "posts-first", etc.
    const slug =
      pathname === '/'
        ? 'home'
        : pathname.replace(/^\//, '').replace(/\//g, '-');

    const cls = `page-${slug}`;

    document.body.classList.add(cls);
    return () => document.body.classList.remove(cls); // cleanup on route change
  }, [pathname]);

  return null; // renders nothing
}
