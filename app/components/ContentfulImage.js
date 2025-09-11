'use client';
import Image from 'next/image';

function contentfulLoader({ src, width, quality }) {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality || 75));
  // Use webp in the real image for good savings; tweak to your needs.
  url.searchParams.set('fm', 'webp');
  return url.toString();
}

export default function ContentfulImage({
  src,
  alt = '',
  sizes = '100vw',
  className,
  priority,
  width,
  height,
  blurDataURL = null, // <-- accept the precomputed blur
  ...rest
}) {
  const layoutProps =
    typeof width === 'number' && typeof height === 'number'
      ? { width, height }
      : { fill: true };

  const blurProps = blurDataURL
    ? { placeholder: 'blur', blurDataURL }
    : { placeholder: 'empty' };
  return (
    <Image
      loader={contentfulLoader}
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      {...blurProps}
      {...layoutProps}
      {...rest}
    />
  );
}
