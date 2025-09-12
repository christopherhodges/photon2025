'use client';

import { useEffect, useRef } from 'react';

/**
 * CustomCursor
 * - Default: small black dot
 * - Hover (over links/buttons/inputs or [data-cursor="hover"]): bigger cyan circle
 *
 * Tweak sizes/colors via props if you want.
 */
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

export default function CustomCursor({
  size = 16, // default dot diameter (px)
  hoverSize = 24, // hover dot diameter (px)
  color = '#000000', // default color
  hoverColor = '#0fd3e1', // hover color (your cyan)
  ease = 0.2, // follow “lag” (0..1)
  zIndex = 99999,
} = {}) {
  const elRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0, // current position
    tx: 0,
    ty: 0, // target position
    scale: 1,
    hovered: false,
    raf: 0,
    visible: false,
  });

  useEffect(() => {
    const el = document.createElement('div');
    elRef.current = el;

    // Inline styles for speed (no layout thrash); Tailwind not needed here
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
      mixBlendMode: 'normal',
      zIndex: String(zIndex),
      willChange: 'transform, width, height, background-color, opacity',
      opacity: '0', // fade in on first move
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
      // Determine hover state from event target each move
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
      // When pointer leaves document (e.g., alt-tab), fade the cursor
      s.visible = false;
      el.style.opacity = '0';
    };

    const loop = () => {
      const { x, y, tx, ty } = s;
      // Smooth follow
      s.x += (tx - x) * ease;
      s.y += (ty - y) * ease;
      el.style.transform = `translate(${s.x - 0.5 * parseFloat(el.style.width)}px, ${s.y - 0.5 * parseFloat(el.style.height)}px)`;
      s.raf = requestAnimationFrame(loop);
    };

    // Prefer pointer events when available
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });

    s.raf = requestAnimationFrame(loop);

    // Respect reduced-motion (snap to target)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleRM = () => {
      stateRef.current.x = stateRef.current.tx;
      stateRef.current.y = stateRef.current.ty;
    };
    if (mq.matches) handleRM();
    mq.addEventListener?.('change', handleRM);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      mq.removeEventListener?.('change', handleRM);
      el.remove();
    };
  }, [size, hoverSize, color, hoverColor, ease, zIndex]);

  return null;
}
