import { draftMode } from 'next/headers';

import BodyContent from '@/app/components/BodyContent';
import Hero from '@/app/components/Hero';
import { getPage } from '@/lib/contentful/pages';
import { notFound } from 'next/navigation';

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
      <section className="mainContent">
        <section className="mainContent">
          <BodyContent bodyContent={bodyContentCollection} />
        </section>
      </section>
    </>
  );
}
