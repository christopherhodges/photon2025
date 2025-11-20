import BodyContent from '@/app/components/BodyContent';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { SignUpForm } from '@/app/components/SignUpForm';
import { getFooter } from '@/lib/contentful/footer';
import { getPage } from '@/lib/contentful/pages';
import { getBlurDataURL } from '@/lib/contentfulBlur';
import clsx from 'clsx';
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
  const { slug } = await params;
  const { page } = await getPage(slug);

  if (!page) return {};

  const title = page.metaTitle ? page.metaTitle : page.title;

  return {
    title: title ? `${title} | ${SITE}` : SITE,
    description: page.metaDescription,
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

export default async function Page({ params }) {
  params = await params;
  const { slug } = params;
  const { page } = await getPage(slug, false);

  const [footer] = await Promise.all([getFooter()]);

  if (!page) return notFound();

  const { hero, bodyContentCollection, testDriveTitle } = page;

  const heroMedia =
    hero && hero.media && hero.media.url
      ? {
          ...hero.media,
          blurDataURL: isSvg(hero.media.url)
            ? null
            : await safeGetBlur(hero.media.url),
        }
      : null;

  return (
    <>
      <main className={clsx('l-main', !hero && 'pb-[40px]')}>
        {hero && (
          <Hero
            title={hero.title}
            titleSize={hero.titleSize}
            mobileTitle={hero.mobileTitle}
            subtitle={hero.subtitle}
            crumb={hero.crumb}
            buttonText={hero.buttonText}
            buttonLink={hero.buttonLink}
            media={heroMedia}
            centerImage={hero.centerImage}
            textColor={hero.textColor}
            bgColor={hero.backgroundColorPicker?.value}
            imageAlignment={hero.imageAlignment}
          />
        )}

        <BodyContent bodyContent={bodyContentCollection} />

        <SignUpForm show={slug === 'sign-up'} />
      </main>
      <Footer
        showTestDriveSection
        testDriveTitle={testDriveTitle}
        footer={footer}
      />
    </>
  );
}
