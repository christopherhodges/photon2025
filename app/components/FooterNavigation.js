import SmartLink from '@/app/components/SmartLink';
import clsx from 'clsx';

export default function FooterNavigation({ footer, className }) {
  const groups =
    footer?.footerMainNavCollection?.items?.filter(
      g => g?.__typename === 'NavGroup',
    ) ?? [];

  if (!groups.length) return null;

  // Distribute items into 3 columns, centering the “extra” items.
  const columns = toColumns(groups, 3);

  return (
    <nav
      aria-label="Footer navigation"
      className={clsx(
        // three columns on md+ to match design
        'grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-3 lg:gap-x-16',
        className,
      )}
    >
      {columns.map((col, idx) => (
        <div key={idx} className="space-y-8 text-sm">
          {col.map(group => (
            <div key={group.label}>
              <p className="mb-[10px] border-b border-black/20 pb-[10px] text-sm font-[500]">
                {group.label}
              </p>
              <ul className="space-y-2">
                {(group.linksCollection?.items ?? []).map(link => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      external={link.external}
                      className="group inline-flex items-center gap-2 hover:underline"
                    >
                      <span className="h-[7px] w-[7px] rounded-full border border-black group-hover:bg-black" />
                      <span>{link.label}</span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}

/** Split items into N columns, putting any “extra” items in the middle column(s). */
function toColumns(items, cols = 3) {
  const base = Math.floor(items.length / cols); // minimum per column
  const extra = items.length % cols; // how many columns get +1
  const counts = Array(cols).fill(base);

  // center the extras (e.g., 7 items → [2,3,2])
  let i = 0,
    middle = Math.floor(cols / 2);
  while (i < extra) counts[middle + i++]++;

  const out = [];
  let start = 0;
  for (let c = 0; c < cols; c++) {
    out.push(items.slice(start, start + counts[c]));
    start += counts[c];
  }
  return out;
}
