import CardGrid from '@/app/components/CardGrid';
import Crumb from '@/app/components/Crumb';
import FeaturedArticles from '@/app/components/FeaturedArticles';
import FeaturedContent from '@/app/components/FeaturedContent';
import JobListings from '@/app/components/JobListings';
import LogoGrid from '@/app/components/LogoGrid';
import RichText from '@/app/components/RichText';
import SectionHeader from '@/app/components/SectionHeader';
import Testimonials from '@/app/components/Testimonials';
import ThreeColumnContent from '@/app/components/ThreeColumnContent';
import TwoColumnContent from '@/app/components/TwoColumnContent';
import { getTestimonialItems } from '@/lib/contentful/testimonials';
import { getBlurDataURL } from '@/lib/contentfulBlur';
import { shuffleString } from '@/lib/utils/shuffleString';
import clsx from 'clsx';
import { Fragment } from 'react';

async function addBlurToCards(cards = []) {
  return Promise.all(
    cards.map(async c => {
      const image = c.image ?? c.coverImage ?? null;
      let blurDataURL = null;

      // Skip SVGs for blur placeholders
      if (image?.url && !/\.svg$/i.test(image.url)) {
        try {
          blurDataURL = await getBlurDataURL(image.url, {
            w: 24,
            q: 20,
            fm: 'jpg',
          });
        } catch {
          // ignore; fall back to no blur
        }
      }

      return {
        ...c,
        image: image ? { ...image, blurDataURL } : null,
      };
    }),
  );
}

const BodyContent = async ({ bodyContent }) => {
  const testimonialItems = await getTestimonialItems(
    '10hDTkGuvBM07WTHTgHIMi',
    false,
  );
  return (
    <>
      {await Promise.all(
        bodyContent?.items.map(async section => {
          if (section.__typename === 'ComponentLogoCarousel') {
            const logos = section.logosCollection.items;
            return (
              <LogoGrid
                className="bg-[var(--light-gray)]"
                key={shuffleString(section.sys.id)}
                title={section.sectionTitle}
                logos={logos}
              />
            );
          } else if (section.__typename === 'ComponentSectionHeading') {
            return (
              <SectionHeader
                key={shuffleString(section.sys.id)}
                title={section.title}
                subtitle={section.subtitle}
              />
            );
          } else if (section.__typename === 'ComponentCardGrid') {
            const cards = await addBlurToCards(section.cardCollection.items);
            return (
              <CardGrid
                key={shuffleString(section.sys.id)}
                layout={
                  section.cardCollection.items?.length === 4
                    ? 'zig-zag'
                    : 'left-tall'
                }
                cards={cards}
              />
            );
          } else if (section.__typename === 'ComponentCaseStudiesSlider') {
            return (
              <FeaturedContent
                key={shuffleString(section.sys.id)}
                sectionTitle={section.title}
                sectionSubtitle={section.subtitle}
                crumb={section.crumb}
                buttonLabel={section.buttonText}
                buttonLink={section.buttonLink}
                items={section.caseStudiesCollection.items}
              />
            );
          } else if (section.__typename === 'TestimonialSlider') {
            return (
              <Testimonials
                className="mx-auto max-w-[1440px] p-[20px] lg:p-[40px]"
                key={shuffleString(section.sys.id)}
                items={section.testimonialsCollection.items}
              />
            );
          } else if (section.__typename === 'ComponentFeaturedPost') {
            return (
              <FeaturedArticles
                key={shuffleString(section.sys.id)}
                sectionTitle={section.title}
                crumb={section.crumb}
                items={section.postsCollection.items}
              />
            );
          } else if (section.__typename === 'Component2Columns') {
            return (
              <TwoColumnContent
                key={shuffleString(section.sys.id)}
                crumb={section.crumb}
                title={section.title}
                content={section.content}
                img1={section.featureImage1}
                img2={section.featureImage2}
                textPlacement={section.textPlacement}
              />
            );
          } else if (section.__typename === 'Component3Columns') {
            if (section.columns === 2) {
              const cards = await addBlurToCards(section.cardsCollection.items);
              return (
                <CardGrid
                  key={shuffleString(section.sys.id)}
                  layout="two-up"
                  cards={cards}
                />
              );
            }
            return (
              <Fragment key={`${section.sys.id}-${section.sys.id}`}>
                <ThreeColumnContent
                  key={shuffleString(section.sys.id)}
                  crumb={section.mainCrumb}
                  cards={section.cardsCollection.items}
                />
              </Fragment>
            );
          } else if (section.__typename === 'ComponentBasicContent') {
            return (
              <div
                key={shuffleString(section.sys.id)}
                className="basic-content body-content-basic"
              >
                <div className="l-container l-container--sm">
                  <RichText
                    key={shuffleString(section.sys.id)}
                    document={section.content.json}
                  />
                </div>
              </div>
            );
          } else if (section.__typename === 'ComponentCareers') {
            const jobs = section.openRolesCollection.items;
            return (
              <div
                key={shuffleString(section.sys.id)}
                className="open-roles py-[40px]"
              >
                <div className="l-container">
                  <div className="mt-8 flex w-full flex-col items-start justify-between gap-8 lg:flex-row">
                    {jobs.length > 0 && (
                      <div className="w-full lg:w-[45%]">
                        <Crumb label="Careers" borderStyles="border" />
                        <h2 className="mb-[20px] mt-[20px] text-[38px]">
                          Open Roles
                        </h2>
                        <a
                          target="_blank"
                          href="/careers"
                          className="button-primary radius-sm"
                        >
                          Careers
                        </a>

                        <JobListings className="mt-4" jobs={jobs} />
                      </div>
                    )}

                    <div
                      className={clsx(
                        'testimonials--small w-full',
                        jobs.length > 0 && 'lg:w-[55%]',
                      )}
                    >
                      <Testimonials
                        titleStyles="mb-[20px] leading-1 md:m-0 md:m-[40px] text-[21px] md:text-[32px]"
                        items={testimonialItems}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        }),
      )}
    </>
  );
};

export default BodyContent;
