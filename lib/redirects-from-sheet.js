import fetch from 'node-fetch';
import Papa from 'papaparse';

const SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/1d1r8pX9ZtvQ1qnJw9UtaE9--GgwMfFYpZPKDzwIjmdk/export?format=csv';

// Map one row → one Next.js redirect object
const rowToRedirect = ({ Old, New, Type }) => {
  if (!Old || !New) return null;

  const { hostname, pathname, search } = new URL(Old);

  return {
    source: `${pathname.replace(/\/$/, '')}${search || ''}` || '/',
    destination: New,
    permanent: String(Type || '').trim() !== '302',
    has: [
      {
        type: 'host',
        value: hostname, // <-- host guard
      },
    ],
  };
};

export async function fetchSheetRedirects() {
  const csv = await (await fetch(SHEET_CSV)).text();
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
  return data.map(rowToRedirect).filter(
    r =>
      r && // not null / undefined
      typeof r.source === 'string' &&
      typeof r.destination === 'string' &&
      r.source.startsWith('/'), // Next.js requirement
  );
}
