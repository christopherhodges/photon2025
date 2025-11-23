import BodyContent from '@/app/components/BodyContent';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { getFooter } from '@/lib/contentful/footer';
import { getPage } from '@/lib/contentful/pages';
import { getBlurDataURL } from '@/lib/contentfulBlur';
import { buildMetadata } from '@/lib/metadata';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const isSvg = (url = '') => /\.svg($|\?)/i.test(url);
const safeGetBlur = async url => {
  try {
    return await getBlurDataURL(url, { w: 24, q: 20, fm: 'jpg' });
  } catch {
    return null;
  }
};

export async function generateMetadata() {
  const slug = '/';
  const { page } = await getPage(slug); // { title }

  return buildMetadata({
    description: page?.subheading,
    image: page?.hero?.media,
    path: slug,
  });
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
