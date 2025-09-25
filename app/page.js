import BodyContent from '@/app/components/BodyContent';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { getFooter } from '@/lib/contentful/footer';
import { getPage } from '@/lib/contentful/pages';
import { getBlurDataURL } from '@/lib/contentfulBlur';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const SITE = 'Photon Health';

const isSvg = (url = '') => /\.svg($|\?)/i.test(url);
const safeGetBlur = async url => {
  try {
    return await getBlurDataURL(url, { w: 24, q: 20, fm: 'jpg' });
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }) {
  const page = await getPage(params.slug); // { title }

  return {
    title: page.title ? `${SITE} | ${page.title}` : SITE,
    metadataBase: new URL('https://photon.health'),
    openGraph: {
      images: [
        {
          url: '/images/open-graph/photon-health.png',
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

  const heroMedia =
    hero.media && hero.media.url
      ? {
          ...hero.media,
          blurDataURL: isSvg(hero.media.url)
            ? null
            : await safeGetBlur(hero.media.url),
        }
      : null;

  return (
    <>
      <main className="l-main">
        {hero && (
          <Hero
            title={hero.title}
            titleSize={hero.titleSize}
            subtitle={hero.subtitle}
            media={heroMedia}
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
