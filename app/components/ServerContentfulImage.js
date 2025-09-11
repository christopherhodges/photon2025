// ❌ Do NOT put 'use client' here
import ContentfulImage from '@/app/components/ContentfulImage';
import { contentfulBlurDataURL } from '@/lib/contentfulBlur'; // server util (uses fetch/Buffer)
import { cache } from 'react';

// Cache the tiny fetch across renders
const getBlur = cache(async src => contentfulBlurDataURL(src));

export default async function ServerContentfulImage(props) {
  const blurDataURL = await getBlur(props.src);
  return <ContentfulImage {...props} blurDataURL={blurDataURL} />;
}
