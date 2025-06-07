import { draftMode } from 'next/headers';

import Hero from '@/app/components/Hero';
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
  const { page } = await getPage(params.slug, isEnabled);
  if (!page) return notFound();

  const { hero } = page;

  return (
    <>
      {hero && (
        <Hero
          title={hero.title}
          subtitle={hero.subtitle}
          media={hero.media}
          textColor={hero.textColor}
        />
      )}
    </>
  );
}
