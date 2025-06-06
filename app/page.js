import { draftMode } from 'next/headers';

import { getAllPages, getPage } from '@/lib/contentful/pages';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const allPages = await getAllPages(false);
  return allPages.map(page => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }) {
  const { isEnabled } = draftMode();
  const { page } = await getPage(params.slug || '/', isEnabled);
  if (!page) notFound();
  return '';
}
