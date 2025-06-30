import { draftMode } from 'next/headers';

import BodyContent from '@/app/components/BodyContent';
import Hero from '@/app/components/Hero';
import { getPage } from '@/lib/contentful/pages';
import { notFound } from 'next/navigation';

const SITE = 'Photon Health';

export async function generateMetadata({ params }) {
  const page = await getPage(params.slug); // { title }

  return {
    title: page.title ? `${SITE} | ${page.title}` : SITE,
    metadataBase: new URL('https://photon.health'),
    openGraph: {
      images: [
        {
          url: '/images/open-graph/photon-health.jpg',
          width: 5120,
          height: 2880,
          alt: 'Photon Health',
        },
      ],
    },
  };
}

export default async function Page() {
  const { isEnabled } = await draftMode();
  const { page } = await getPage('/', isEnabled);
  if (!page) return notFound();

  const { hero, bodyContentCollection } = page;

  return (
    <>
      {hero && (
        <Hero
          title={hero.title}
          titleSize={hero.titleSize}
          subtitle={hero.subtitle}
          media={hero.media}
          centerImage={hero.centerImage}
          textColor={hero.textColor}
        />
      )}

      <BodyContent bodyContent={bodyContentCollection} />
    </>
  );
}
