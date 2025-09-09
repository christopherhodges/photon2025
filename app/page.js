import { draftMode } from 'next/headers';

import BodyContent from '@/app/components/BodyContent';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { getFooter } from '@/lib/contentful/footer';
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
  const [footer] = await Promise.all([getFooter()]);
  if (!page) return notFound();

  const { hero, bodyContentCollection } = page;

  return (
    <>
      <main className="l-main">
        <div className="hidden">hi</div>
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
      </main>
      <Footer footer={footer} />
    </>
  );
}
