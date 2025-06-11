import BodyContent from '@/app/components/BodyContent';
import Crumb from '@/app/components/Crumb';
import Hero from '@/app/components/Hero';
import Testimonials from '@/app/components/Testimonials';
import { getPage } from '@/lib/contentful/pages';
import { getTestimonial } from '@/lib/contentful/testimonials';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const { isEnabled } = await draftMode();
  params = await params;
  const { slug } = params;
  const { page } = await getPage(slug, isEnabled);
  const { testimonial } = await getTestimonial('0');
  console.log(page);
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
        <BodyContent bodyContent={bodyContentCollection} />
      </section>

      {slug === 'about-us' ||
        (slug === 'join-us' && (
          <div className="open-roles py-[40px]">
            <div className="l-container">
              <div className="flex items-center justify-between">
                <div className="w-1/2">
                  <Crumb label="Careers" borderStyles="border" />
                  <h2 className="mb-[40px] mt-[20px] text-[38px]">
                    Open Roles
                  </h2>
                  <p className="text-sm">
                    We’re not hiring right now, but we’re always interested in
                    connecting with great people. Join our Talent Network by
                    sharing your details, and we’ll reach out if something opens
                    up that’s a good fit.
                  </p>
                  <a href="#" className="flex items-center gap-2">
                    Connect with us{' '}
                    <Image
                      className="h-[12px] w-[12px] invert"
                      width={20}
                      height={21}
                      src="/icons/arrow-right-up.svg"
                      alt="Up Right Arrow"
                    />
                  </a>
                </div>
                <div className="w-1/2">
                  <Testimonials items={testimonial} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
