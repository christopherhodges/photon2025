'use client';
import SmartLink from '@/app/components/SmartLink';
import { useBodyScrollLock } from '@/app/hooks/useBodyScrollLock';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

const linkClass = style =>
  ({
    default:
      'relative flex items-center gap-2 rounded-[20px] px-4 py-2 transition-colors hover:bg-[var(--light-gray)]',
    primary: 'button-primary text-[11px] xl:text-sm',
    outline: 'button-outline text-[11px] xl:text-sm',
  })[style] || 'text-gray-700 hover:text-gray-900';

export default function HeaderFull({ menu }) {
  const { logo, itemsCollection } = menu;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  /* ----- close the mobile menu when route changes ----- */
  useEffect(() => {
    setOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname]);

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
      <header className="l-header--mobile fixed left-1/2 top-[60px] z-[10000] flex h-[70px] w-[calc(100%-40px)] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={logo.description || menu.title}
              priority
              className="h-auto max-w-[120px]" /* narrower fit */
            />
          )}
        </Link>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-3 rounded-full bg-[#E8EAF0] px-[14px] py-[7px] text-sm"
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
          'mobile-slide-down-panel fixed left-0 top-0 z-[9999] h-screen w-screen overflow-y-auto pb-[50px]',
          'bg-gradient-to-br from-[#6D6BFF] via-[#9C7CFF] to-[#C5CBFF]',
          'transition-transform duration-300',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        {/* inner card */}
        <div className="mx-4 mt-[110px] rounded-[20px] bg-white p-6">
          {/* main nav list */}
          <ul>
            {firstPart.map(item =>
              item.__typename === 'NavLink' ? (
                <MobileNavLink key={item.label} {...item} />
              ) : (
                <MobileAccordion key={item.label} {...item} drawerOpen={open} />
              ),
            )}

            {/* docs or single links left */}
            {lastPart
              .filter(item => item.__typename === 'NavLink')
              .filter(item => item.label !== 'Sign In')
              .filter(item => item.label !== 'Contact Sales')
              .map(link => (
                <Fragment key={link.label}>
                  <MobileNavLink {...link} />
                </Fragment>
              ))}
          </ul>
        </div>

        {/* buttons */}
        <div className="mx-4 mt-[20px] flex flex-col-reverse gap-3 rounded-[20px] bg-white p-6">
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
        <div className="mx-4 mb-12 mt-12 pt-4 text-sm">
          <p className="mb-[16px] border-b border-black pb-[16px] font-normal">
            Follow Us
          </p>
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
      <header className="l-header invisible fixed left-1/2 top-[70px] z-[10000] hidden w-[1360px] max-w-[calc(100%-80px)] -translate-x-1/2 items-center justify-between rounded-[16px] bg-white px-[16px] py-[13px] lg:visible lg:flex">
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={logo.description || menu.title}
              priority
              className="h-auto md:w-[90px] lg:w-[120px] xl:w-[170px]"
            />
          )}
          <span className="sr-only">{menu.title}</span>
        </Link>

        {/* ------------------------------------------------------------------
            Desktop nav
        ------------------------------------------------------------------ */}
        <nav className="navigation flex items-center gap-1.5 xl:gap-3">
          {firstPart.map(entry =>
            entry.__typename === 'NavLink' ? (
              <NavLink
                external={entry.external}
                type="default"
                href={entry.slug}
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
          <nav className="flex items-center gap-1.5 xl:gap-3">
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
    <li className="mb-[18px] last-of-type:mb-0">
      <SmartLink
        href={href}
        external={external}
        className={clsx(
          'flex items-center gap-2 rounded-[12px] text-lg font-normal',
          active && 'bg-[var(--light-gray)] font-normal',
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
function MobileAccordion({ label, linksCollection, drawerOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) setOpen(false);
  }, [drawerOpen]);
  return (
    <li className="mb-[18px] last-of-type:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-[12px] text-lg font-normal"
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
          open ? 'mobile-dropdown-open max-h-[500px] py-3' : 'max-h-0 py-0',
        )}
      >
        {linksCollection.items.map(link => (
          <li key={link.label}>
            <SmartLink
              href={link.href}
              external={link.external ? '_blank' : ''}
              className="flex items-center gap-3 rounded-[12px] px-2 py-3 font-light"
            >
              {link.icon && (
                <Image
                  src={link.icon.url}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              )}
              <div className="flex flex-col text-left">
                <span className="text-base">{link.label}</span>
                {link.shortDescription && (
                  <span className="text-[11px] text-gray-500">
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
function NavGroup({ label, linksCollection, href }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  // Build the set of internal hrefs we consider "active" for this group
  const activeHrefs = (linksCollection?.items ?? [])
    .map(l => l?.href)
    .concat(href) // include the group's own href if present
    .filter(Boolean)
    .filter(h => h.startsWith('/')); // ignore external links

  const isPathMatch = (path, h) => {
    if (h === '/') return path === '/'; // don't match everything
    return path === h || path.startsWith(`${h}/`); // match subroutes
  };

  const isActive = activeHrefs.some(h => isPathMatch(pathname, h));

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownOpen &&
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
            'relative flex items-center gap-2 rounded-[20px] text-[11px] transition-colors xl:text-sm',
            dropdownOpen || isActive
              ? 'bg-[var(--light-gray)] font-normal'
              : 'bg-transparent hover:bg-[var(--light-gray)] group-hover:font-normal',
          )}
        >
          <span
            className={clsx(
              'block h-[7px] w-[7px] rounded-full border border-transparent transition-colors group-hover:border-black',
              (dropdownOpen || isActive) && 'bg-black',
            )}
          />
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
          {(linksCollection?.items ?? []).map(link => (
            <SmartLink
              key={link.label}
              href={link.href}
              external={link.external ? '_blank' : ''}
              onClick={() => setDropdownOpen(false)}
              className={clsx(
                'radius-[20px] group flex w-1/2 items-center gap-4 rounded-[20px] border p-[9px]',
                isPathMatch(pathname, link.href)
                  ? 'border-[var(--blue)]'
                  : 'border-transparent hover:border-[var(--blue)]',
              )}
            >
              <div
                className={clsx(
                  'transiton-colors flex h-[60px] w-[60px] items-center justify-center rounded-[20px]',
                  isPathMatch(pathname, link.href)
                    ? 'bg-[var(--blue)]'
                    : 'bg-[var(--light-gray)] group-hover:bg-[var(--blue)]',
                )}
              >
                {link.icon && (
                  <Image
                    src={link.icon.url}
                    alt={link.label}
                    width={link.icon.width}
                    height={link.icon.height}
                    className={clsx(
                      'transiton-all',
                      isPathMatch(pathname, link.href)
                        ? 'invert'
                        : 'group-hover:invert',
                    )}
                  />
                )}
              </div>
              <div className="group flex flex-col">
                <span
                  className={clsx(
                    'transition-colors',
                    isPathMatch(pathname, link.href)
                      ? 'font-normal text-[var(--blue)]'
                      : 'group-hover:font-normal group-hover:text-[var(--blue)]',
                  )}
                >
                  {link.label}
                </span>
                {link.shortDescription && (
                  <span className="text-[11px] text-[var(--gray)]">
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
      className={clsx(
        classes,
        'group',
        'link-' + pathname,
        isActive && 'current active',
      )}
      target="_blank"
      onClick={onClick}
    >
      {type === 'default' && (
        <span
          className={clsx(
            'relative flex items-center gap-2 rounded-[20px] text-[11px] transition-colors xl:text-sm',
            isActive
              ? 'bg-[var(--light-gray)] font-normal'
              : 'bg-transparent group-hover:bg-[var(--light-gray)] group-hover:font-normal',
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
        <span
          className={
            showIcon ? 'flex items-center gap-2 text-[11px] xl:text-sm' : ''
          }
        >
          {label}
          {showIcon && (
            <Image
              className="hidden invert xl:block"
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
