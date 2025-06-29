// lib/withBr.js
'use client';

export function withBr(text) {
  // bail out early if nothing to render
  if (text == null) return null; // null or undefined → render nothing

  // coerce every other input to string (numbers, booleans, etc.)
  const str = typeof text === 'string' ? text : String(text);

  return str
    .split(/<br\s*\/?>/gi) // also matches <br/>, <br >
    .flatMap((seg, i) => (i === 0 ? seg : [<br key={i} />, seg]));
}
