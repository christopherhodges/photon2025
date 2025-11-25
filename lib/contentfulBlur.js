// Server-only helper to make a tiny base64 blur from a Contentful image URL
export async function getBlurDataURL(imageUrl, opts = {}) {
  const { w = 24, q = 5, fm = 'png' } = opts;
  const normalized = imageUrl?.startsWith('//')
    ? 'https:' + imageUrl
    : imageUrl;
  const url = new URL(normalized);
  url.searchParams.set('w', String(w));
  url.searchParams.set('q', String(q));
  url.searchParams.set('fm', fm);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Blur fetch failed: ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  return `data:image/${fm};base64,${buf.toString('base64')}`;
}
