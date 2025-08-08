import SmartLink from '@/app/components/SmartLink';
import clsx from 'clsx';

/**
 * FooterNavigation
 * Expects the "menu" shape returned by getNavigationMenu().
 * Only NavGroup items are rendered (each as a column).
 */
export default function FooterNavigation({ menu, className }) {
  const groups =
    menu?.itemsCollection?.items?.filter(i => i?.__typename === 'NavGroup') ??
    [];

  if (groups.length === 0) return null;

  return (
    <nav
      className={clsx(
        // 6 columns at xl like your design, collapse down on smaller screens
        'grid grid-cols-4 gap-x-10 gap-y-6',
        className,
      )}
      aria-label="Footer navigation"
    >
      {groups.map(group => (
        <div className="text-sm" key={group.label}>
          <p className="mb-[10px] border-b border-black/20 pb-[10px] text-base font-[500]">
            {group.label}
          </p>

          <ul className="space-y-2">
            {(group.linksCollection?.items ?? []).map(link => (
              <li key={link.label}>
                <SmartLink
                  href={link.href}
                  external={link.external}
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <div className="h-[7px] w-[7px] rounded-full border border-black group-hover:bg-black"></div>
                  <span>{link.label}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
