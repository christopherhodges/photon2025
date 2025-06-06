'use client';
import Image from 'next/image';
import Link from 'next/link';

// ---------------------------------------------------------------------------
//  Utility – map “style” → Tailwind classes
// ---------------------------------------------------------------------------
const linkClass = style =>
  ({
    default: 'nav-link',
    primary: 'button-primary',
    outline: 'button-outline',
  })[style] || 'text-gray-700 hover:text-gray-900';

// ---------------------------------------------------------------------------
//  <Header menu={navigationMenu} />
// ---------------------------------------------------------------------------
export default function Header({ menu }) {
  if (!menu) return null; // renders nothing until CMS entry exists

  const { logo, itemsCollection } = menu;
  const mainItems = itemsCollection?.items;
  const firstPart = mainItems.slice(0, -2); // all except last 2 (empty if < 2)
  const lastPart = mainItems.slice(-2); // last 2 (empty if < 2)

  return (
    <header className="fixed left-1/2 top-[60px] flex w-full max-w-[1360px] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-[16px] py-[20px]">
      <Link href="/" className="flex items-center gap-2">
        {logo && (
          <Image
            src={logo.url}
            width={logo.width}
            height={logo.height}
            alt={logo.description || menu.title}
            priority
            className="w-[170px]"
          />
        )}
        <span className="sr-only">{menu.title}</span>
      </Link>

      {/* ------------------------------------------------------------------
            Desktop nav
        ------------------------------------------------------------------ */}
      <nav className="flex items-center gap-3">
        {firstPart.map(entry =>
          entry.__typename === 'NavLink' ? (
            <NavLink key={entry.label} {...entry} />
          ) : (
            <NavGroup key={entry.label} {...entry} />
          ),
        )}
      </nav>

      {lastPart.length > 0 && (
        <nav className="flex items-center gap-3">
          {lastPart.map(entry =>
            entry.__typename === 'NavLink' ? (
              <NavLink key={entry.label} {...entry} />
            ) : (
              <NavGroup key={entry.label} {...entry} />
            ),
          )}
        </nav>
      )}
    </header>
  );
}

function NavLink({ label, href, style, external, onClick }) {
  const classes = linkClass(style);
  return external ? (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener"
      onClick={onClick}
    >
      <span>{label}</span>
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick}>
      <span>{label}</span>
    </Link>
  );
}

/* ---------- desktop dropdown group ---------- */
function NavGroup({ label, linksCollection }) {
  return (
    <div className="navGroup group">
      <button className="flex items-center gap-1">
        {label}
        <svg
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div className="invisible absolute left-0 mt-[46px] flex w-full justify-center rounded-[16px] bg-white p-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        {linksCollection.items.map(link => (
          <a className="flex" key={link.label} href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
