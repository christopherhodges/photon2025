'use client';

import { useEffect, useRef } from 'react';

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

export default function CustomCursor({
  size = 16,
  hoverSize = 24,
  color = '#000000',
  hoverColor = '#0fd3e1',
  ease = 0.2,
  zIndex = 999999,
} = {}) {
  const elRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    hovered: false,
    raf: 0,
    visible: false,
  });

  useEffect(() => {
    // ── Desktop check: requires hover + fine pointer and NO touch points.
    // This blocks phones/tablets (including iPad with touch), but still allows desktops.
    const mq = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    const hasHoverFinePointer = !!mq && mq.matches;
    const hasTouch = (navigator.maxTouchPoints ?? 0) > 0;

    // Optional extra guard (UA is brittle; use only if you *must* exclude tablets with mice):
    const ua = navigator.userAgent.toLowerCase();
    const isMobileOrTabletUA = /iphone|ipad|ipod|android|mobile|tablet/.test(
      ua,
    );

    const isDesktopOnly =
      hasHoverFinePointer && !hasTouch && !isMobileOrTabletUA;
    if (!isDesktopOnly) return; // ← do not mount the custom cursor

    const el = document.createElement('div');
    elRef.current = el;

    Object.assign(el.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      background: color,
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      zIndex: String(zIndex),
      willChange: 'transform, width, height, background-color, opacity',
      opacity: '0',
      transition:
        'width 160ms ease, height 160ms ease, background-color 160ms ease, opacity 160ms ease',
    });

    document.body.appendChild(el);

    const s = stateRef.current;

    const onMove = e => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (!s.visible) {
        s.visible = true;
        el.style.opacity = '1';
      }
      const isHover = !!e.target?.closest?.(HOVER_SELECTOR);
      if (isHover !== s.hovered) {
        s.hovered = isHover;
        if (s.hovered) {
          el.style.width = `${hoverSize}px`;
          el.style.height = `${hoverSize}px`;
          el.style.backgroundColor = hoverColor;
        } else {
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.backgroundColor = color;
        }
      }
    };

    const onLeave = () => {
      s.visible = false;
      el.style.opacity = '0';
    };

    const loop = () => {
      const { x, y, tx, ty } = s;
      s.x += (tx - x) * ease;
      s.y += (ty - y) * ease;
      el.style.transform = `translate(${s.x - 0.5 * parseFloat(el.style.width)}px, ${s.y - 0.5 * parseFloat(el.style.height)}px)`;
      s.raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });
    s.raf = requestAnimationFrame(loop);

    // If the media query flips (e.g., device mode toggled), remove the cursor.
    const mqListener = e => {
      if (!e.matches) onLeave();
    };
    mq?.addEventListener?.('change', mqListener);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      mq?.removeEventListener?.('change', mqListener);
      el.remove();
    };
  }, [size, hoverSize, color, hoverColor, ease, zIndex]);

  return null;
}
