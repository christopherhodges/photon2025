import fetch from 'node-fetch';
import Papa from 'papaparse';

const SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/1PEBrV4PcfjV6IIIrkpjUrrh1ipXPds7_WBI6EBDl24c/export?format=csv';

// Map one row → one Next.js redirect object
const rowToRedirect = ({ Old, New, Type }) => ({
  source: new URL(Old).pathname.replace(/\/$/, '') || '/', // strip host + trailing /
  destination: New,
  permanent: String(Type || '').trim() !== '302', // default 308
});

export async function fetchSheetRedirects() {
  const csv = await (await fetch(SHEET_CSV)).text();
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
  return data.map(rowToRedirect);
}
