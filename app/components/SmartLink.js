import clsx from 'clsx';
import Link from 'next/link';

export default function SmartLink({
  href,
  external = false,
  className,
  onClick,
  children,
}) {
  // choose the tag once
  const Tag = external ? 'a' : Link;

  // common props
  const props = {
    href,
    className: clsx('pointer', className),
    onClick,
    // add target / rel only for external links
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
  };

  return <Tag {...props}>{children}</Tag>;
}
