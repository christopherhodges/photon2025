'use client';
import SmartLink from '@/app/components/SmartLink';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
//  Utility – map “style” → Tailwind classes
// ---------------------------------------------------------------------------
const linkClass = style =>
  ({
    default:
      'nav-link relative group flex items-center gap-2 rounded-[20px] bg-transparent transition-colors hover:bg-[var(--light-gray)]',
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
  console.log(mainItems);
  return (
    <header className="header fixed left-1/2 top-[60px] flex w-full max-w-[1360px] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-[16px] py-[20px]">
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
            <NavLink
              external={entry.external}
              type="default"
              classes="text-sm"
              key={entry.label}
              {...entry}
            />
          ) : (
            <NavGroup key={entry.label} {...entry} />
          ),
        )}
      </nav>

      {lastPart.length > 0 && (
        <nav className="flex items-center gap-3">
          {lastPart.map(entry =>
            entry.__typename === 'NavLink' ? (
              <NavLink external={entry.external} key={entry.label} {...entry} />
            ) : (
              <NavGroup key={entry.label} {...entry} />
            ),
          )}
        </nav>
      )}
    </header>
  );
}

function NavLink({ label, href, type, style, external, onClick }) {
  const classes = linkClass(style);
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <SmartLink
      external={external}
      href={href}
      className={clsx(classes)}
      target="_blank"
      onClick={onClick}
    >
      {type === 'default' && (
        <span
          className={clsx(
            'relative flex items-center gap-2 rounded-[20px] transition-colors',
            isActive
              ? 'bg-[var(--light-gray)] font-bold'
              : 'bg-transparent group-hover:bg-[var(--light-gray)] group-hover:font-medium',
          )}
        >
          <span
            className={clsx(
              'block h-[7px] w-[7px] rounded-full border border-transparent transition-colors group-hover:border-black',
              isActive && 'bg-black',
            )}
          ></span>
          {label}
        </span>
      )}
      {type !== 'default' && <span>{label}</span>}
    </SmartLink>
  );
}

/* ---------- desktop dropdown group ---------- */
function NavGroup({ label, linksCollection }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="navDropdown">
      <button
        ref={buttonRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={clsx('nav-link group', dropdownOpen && 'active')}
      >
        <span
          className={clsx(
            'relative flex items-center gap-2 rounded-[20px] transition-colors',
            dropdownOpen
              ? 'bg-[var(--light-gray)] font-bold'
              : 'bg-transparent hover:bg-[var(--light-gray)] group-hover:font-medium',
          )}
        >
          <span
            className={clsx(
              'block h-[7px] w-[7px] rounded-full border border-transparent transition-colors group-hover:border-black',
              dropdownOpen && 'bg-black',
            )}
          ></span>
          {label}
          <svg
            className={clsx(
              'h-4 w-4 transition-transform',
              dropdownOpen ? 'rotate-180' : '',
            )}
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
        </span>
      </button>

      <div
        ref={wrapperRef}
        className={clsx(
          'absolute left-0 top-full mt-[16px] w-full rounded-[16px] bg-white p-2 transition-all duration-150',
          dropdownOpen
            ? 'visible translate-y-[0] opacity-100'
            : 'invisible translate-y-[-16px] opacity-0',
        )}
      >
        <div className="mx-auto flex w-full max-w-[938px] items-center justify-center gap-8 py-[16px]">
          {linksCollection.items.map(link => (
            <SmartLink
              className="radius-[20px] group flex w-1/2 items-center gap-4 rounded-[20px] border border-transparent p-[9px] hover:border-[var(--blue)]"
              key={link.label}
              href={link.href}
              onClick={() => {
                console.log('hlleo');
                setDropdownOpen(false);
              }}
            >
              <div className="transiton-colors flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[var(--light-gray)] group-hover:bg-[var(--blue)]">
                <Image
                  src={link.icon.url}
                  alt={link.label}
                  width={link.icon.width}
                  height={link.icon.height}
                  className="transiton-all group-hover:invert"
                />
              </div>
              <div className="group flex flex-col">
                <span className="transition-colors group-hover:font-bold group-hover:text-[var(--blue)]">
                  {link.label}
                </span>
                <span className="text-xs text-[var(--gray)]">
                  Lorem ipsum dolor sit amet.
                </span>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
}
