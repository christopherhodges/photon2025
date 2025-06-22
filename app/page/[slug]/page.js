import BodyContent from '@/app/components/BodyContent';
import Crumb from '@/app/components/Crumb';
import Hero from '@/app/components/Hero';
import { SignUpForm } from '@/app/components/SignUpForm';
import Testimonials from '@/app/components/Testimonials';
import { getPage } from '@/lib/contentful/pages';
import { getTestimonialItems } from '@/lib/contentful/testimonials';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const { isEnabled: preview } = await draftMode();
  params = await params;
  const { slug } = params;
  const { page } = await getPage(slug, preview);

  if (!page) return notFound();

  const testimonialItems = await getTestimonialItems(
    '10hDTkGuvBM07WTHTgHIMi',
    preview,
  );

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

      <SignUpForm show={slug === 'sign-up'} />

      {(slug === 'about-us' || slug === 'join-us') && (
        <div className="open-roles py-[40px]">
          <div className="l-container">
            <div className="flex items-center justify-between gap-[40px]">
              <div className="w-1/2">
                <Crumb label="Careers" borderStyles="border" />
                <h2 className="mb-[40px] mt-[20px] text-[38px]">Open Roles</h2>
                <p className="mt-[16px] opacity-[.8]">
                  We’re not hiring right now, but we’re always interested in
                  connecting with great people. Join our Talent Network by
                  sharing your details, and we’ll reach out if something opens
                  up that’s a good fit.
                </p>
                <a
                  target="_blank"
                  href="https://wellfound.com/company/photon-health"
                  className="mt-[16px] flex items-center gap-2"
                >
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
              <div className="testimonials--small w-[770px]">
                <Testimonials
                  titleStyles="mb-[20px] leading-1 text-[32px]"
                  items={testimonialItems}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
