'use client';

import { useEffect, useRef } from 'react';

export const SignUpForm = ({ show }) => {
  const containerRef = useRef(null);

  /*  Hook always runs, but bails out early if not showing */
  useEffect(() => {
    if (!show) return;

    const el = containerRef.current;
    if (!el) return;

    const script = document.createElement('script');
    script.src = 'https://form.jotform.com/jsform/251325703823048';
    script.async = true;
    el.appendChild(script);

    /* cleanup */
    return () => {
      el.innerHTML = '';
    };
  }, [show]);

  /*  Render nothing when hidden */
  if (!show) return null;

  return <section ref={containerRef} className="sign-up-form pt-[150px]" />;
};
