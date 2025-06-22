'use client';

import { useEffect, useRef } from 'react';

export const SignUpForm = ({ show }) => {
  const containerRef = useRef(null);
  if (!show) return;
  useEffect(() => {
    if (!show) return;

    const s = document.createElement('script');
    s.src = 'https://form.jotform.com/jsform/251325703823048';
    s.async = true;
    containerRef.current.appendChild(s);

    // cleanup when component unmounts or `show` flips back to false
    return () => {
      containerRef.current.innerHTML = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <section ref={containerRef} className="sign-up-form pt-[150px]"></section>
  );
};
