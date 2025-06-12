'use client';
import SmartLink from '@/app/components/SmartLink';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

const linkClass = style =>
  ({
    default:
      'relative flex items-center gap-2 rounded-[20px] px-4 py-2 transition-colors hover:bg-[var(--light-gray)]',
    primary: 'button-primary text-sm',
    outline: 'button-outline text-sm',
  })[style] || 'text-gray-700 hover:text-gray-900';

export default function HeaderFull({ menu }) {
  const { logo, itemsCollection } = menu;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* ----- close the mobile menu when route changes ----- */
  useEffect(() => setOpen(false), [pathname]);

  /* split nav items like before */
  const mainItems = itemsCollection?.items ?? [];
  const firstPart = mainItems.slice(0, -2);
  const lastPart = mainItems.slice(-2);

  /* ---------------------------------------------------------------------- */
  /*  MOBILE  ( < lg )                                                     */
  /* ---------------------------------------------------------------------- */
  return (
    <>
      {/* top bar (logo + toggle) */}
      <header className="fixed left-1/2 top-[60px] z-[10000] flex h-[70px] w-[calc(100%-40px)] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={logo.description || menu.title}
              priority
              className="h-auto w-[120px]" /* narrower fit */
            />
          )}
        </Link>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-3 rounded-full bg-[var(--light-gray)] px-[14px] py-[7px] text-sm"
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          {open ? (
            <svg
              className="h-[9px] w-[9px]"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* “hamburger” */
            <svg
              className="h-[12px] w-[12px]"
              width="18"
              height="12"
              viewBox="0 0 18 12"
            >
              <path
                d="M1 1h16M1 6h16M1 11h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </header>

      {/* slide-down panel */}
      <div
        className={clsx(
          'fixed left-0 top-0 z-[9999] h-screen w-screen overflow-y-auto',
          'bg-gradient-to-br from-[#6D6BFF] via-[#9C7CFF] to-[#C5CBFF]',
          'transition-transform duration-300',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        {/* announcement bar */}
        <div className="flex h-[40px] items-center justify-center bg-black text-xs font-medium text-white">
          ANNOUNCEMENT&nbsp; BAR &nbsp;
          <Link href="/announcement" className="text-cyan-300 underline">
            READ&nbsp; MORE&nbsp;→
          </Link>
        </div>

        {/* inner card */}
        <div className="mx-4 mt-[110px] rounded-[20px] bg-white p-6">
          {/* main nav list */}
          <ul>
            {firstPart.map(item =>
              item.__typename === 'NavLink' ? (
                <MobileNavLink key={item.label} {...item} />
              ) : (
                <MobileAccordion key={item.label} {...item} />
              ),
            )}

            {/* docs or single links left */}
            {lastPart
              .filter(item => item.__typename === 'NavLink')
              .map(link => (
                <Fragment key={link.label}>
                  <MobileNavLink {...link} />
                </Fragment>
              ))}
          </ul>
        </div>

        {/* buttons */}
        <div className="mx-4 mt-8 flex flex-col flex-col-reverse gap-3">
          {lastPart
            .filter(
              item => item.__typename === 'NavLink' && item.style !== 'default',
            )
            .map(btn => (
              <SmartLink
                key={btn.label}
                href={btn.href}
                external={btn.external}
                className={linkClass(btn.style)}
              >
                <span>{btn.label}</span>
              </SmartLink>
            ))}
        </div>

        {/* footer links */}
        <div className="mx-4 mt-12 border-t border-black pt-4 text-sm">
          <p className="mb-2 font-medium">Follow Us</p>
          <ul className="space-y-1">
            <li>
              <Link href="https://instagram.com">Instagram</Link>
            </li>
            <li>
              <Link href="https://linkedin.com">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */
      /*  DESKTOP  ( lg: ) – your original header, almost untouched         */
      /* ------------------------------------------------------------------ */}
      <header className="invisible fixed left-1/2 top-[70px] z-[10000] hidden w-[1360px] max-w-[calc(100%-80px)] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-[16px] py-[13px] lg:visible lg:flex">
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={logo.description || menu.title}
              priority
              className="h-auto w-[170px]"
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
            {lastPart.map((entry, i) =>
              entry.__typename === 'NavLink' ? (
                <Fragment key={entry.label}>
                  <NavLink
                    showIcon={lastPart.length === i + 1}
                    external={entry.external}
                    {...entry}
                  />
                </Fragment>
              ) : (
                <NavGroup key={entry.label} {...entry} />
              ),
            )}
          </nav>
        )}
      </header>
    </>
  );
}

/* ------------ helpers ------------ */

/* simple link in mobile list */
function MobileNavLink({ label, href, external }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <li>
      <SmartLink
        href={href}
        external={external}
        className={clsx(
          'flex items-center gap-2 rounded-[12px] px-4 py-3 text-lg',
          active && 'bg-[var(--light-gray)] font-bold',
        )}
      >
        <span
          className={clsx(
            'block h-[7px] w-[7px] rounded-full border border-black',
            active && 'bg-black',
          )}
        />
        {label}
      </SmartLink>
    </li>
  );
}

/* accordion for “Company” on mobile */
function MobileAccordion({ label, linksCollection }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-lg"
      >
        <div className="flex items-center gap-2">
          <span className="block h-[7px] w-[7px] rounded-full border border-black" />
          {label}
        </div>
        <svg
          className={clsx('h-5 w-5 transition-transform', open && 'rotate-180')}
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

      <ul
        className={clsx(
          'mt-2 space-y-2 overflow-hidden rounded-[12px] bg-[var(--light-gray)] px-4 transition-[max-height] duration-300',
          open ? 'max-h-[500px] py-3' : 'max-h-0 py-0',
        )}
      >
        {linksCollection.items.map(link => (
          <li key={link.label}>
            <SmartLink
              href={link.href}
              className="flex items-center gap-3 rounded-[12px] px-2 py-3"
            >
              <Image
                src={link.icon.url}
                alt={link.label}
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div className="flex flex-col text-left">
                <span className="text-base font-medium">{link.label}</span>
                {link.shortDescription && (
                  <span className="text-xs text-gray-500">
                    {link.shortDescription}
                  </span>
                )}
              </div>
            </SmartLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  DESKTOP dropdown (“Company” etc.)                                 */
/* ------------------------------------------------------------------ */
function NavGroup({ label, linksCollection }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const isActive = pathname === '/about-us' || pathname === '/join-us';

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
        className={clsx(
          'nav-link group',
          dropdownOpen && 'active',
          isActive && 'current',
        )}
      >
        <span
          className={clsx(
            'classes="text-sm" relative flex items-center gap-2 rounded-[20px] transition-colors',
            dropdownOpen || isActive
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
              className={clsx(
                'radius-[20px] group flex w-1/2 items-center gap-4 rounded-[20px] border p-[9px]',
                pathname === link.href
                  ? 'border-[var(--blue)]'
                  : 'border-transparent hover:border-[var(--blue)]',
              )}
              key={link.label}
              href={link.href}
              onClick={() => {
                setDropdownOpen(false);
              }}
            >
              <div
                className={clsx(
                  'transiton-colors flex h-[60px] w-[60px] items-center justify-center rounded-[20px]',
                  pathname === link.href
                    ? 'bg-[var(--blue)]'
                    : 'bg-[var(--light-gray)] group-hover:bg-[var(--blue)]',
                )}
              >
                <Image
                  src={link.icon.url}
                  alt={link.label}
                  width={link.icon.width}
                  height={link.icon.height}
                  className={clsx(
                    'transiton-all',
                    pathname === link.href ? 'invert' : 'group-hover:invert',
                  )}
                />
              </div>
              <div className="group flex flex-col">
                <span
                  className={clsx(
                    'transition-colors',
                    pathname === link.href
                      ? 'font-bold text-[var(--blue)]'
                      : 'group-hover:font-bold group-hover:text-[var(--blue)]',
                  )}
                >
                  {link.label}
                </span>
                {link.shortDescription && (
                  <span className="text-xs text-[var(--gray)]">
                    {link.shortDescription}
                  </span>
                )}
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavLink({
  showIcon = false,
  label,
  href,
  type,
  style,
  external,
  onClick,
}) {
  const classes = linkClass(style);
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <SmartLink
      external={external}
      href={href}
      className={clsx(classes, 'group', 'link-' + pathname)}
      target="_blank"
      onClick={onClick}
    >
      {type === 'default' && (
        <span
          className={clsx(
            'relative flex items-center gap-2 rounded-[20px] text-sm transition-colors',
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
      {type !== 'default' && (
        <span className={showIcon && 'flex items-center gap-2'}>
          {label}
          {showIcon && (
            <Image
              className="invert"
              width={10}
              height={11}
              src="/icons/arrow-right-up.svg"
              alt="right arrow up"
            />
          )}
        </span>
      )}
    </SmartLink>
  );
}
