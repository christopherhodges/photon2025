import { draftMode } from 'next/headers';

import CardGrid from '@/app/components/CardGrid';
import FeaturedContent from '@/app/components/FeaturedContent';
import Hero from '@/app/components/Hero';
import LogoGrid from '@/app/components/LogoGrid';
import SectionHeader from '@/app/components/SectionHeader';
import Testimonials from '@/app/components/Testimonials';
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
        {bodyContentCollection?.items.map(section => {
          if (section.__typename === 'ComponentLogoCarousel') {
            const logos = section.logosCollection.items;
            return (
              <LogoGrid
                key={section.__typename}
                title={section.sectionTitle}
                logos={logos}
              />
            );
          } else if (section.__typename === 'ComponentSectionHeading') {
            return (
              <SectionHeader
                key={section.__typename}
                title={section.title}
                subtitle={section.subtitle}
              />
            );
          } else if (section.__typename === 'ComponentCardGrid') {
            return (
              <CardGrid
                key={section.__typename}
                layout="left-tall"
                cards={section.cardCollection.items}
              />
            );
          } else if (section.__typename === 'ComponentCaseStudiesSlider') {
            return (
              <FeaturedContent
                key={section.__typename}
                sectionTitle={section.title}
                crumb={section.crumb}
                buttonLabel={section.buttonText}
                buttonLink={section.buttonLink}
                items={section.caseStudiesCollection.items}
              />
            );
          } else if (section.__typename === 'TestimonialSlider') {
            return (
              <Testimonials
                key={section.__typename}
                items={section.testimonialsCollection.items}
              />
            );
          }
        })}
      </section>
    </>
  );
}
