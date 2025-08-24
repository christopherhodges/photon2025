import BodyContent from '@/app/components/BodyContent';
import Crumb from '@/app/components/Crumb';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { SignUpForm } from '@/app/components/SignUpForm';
import Testimonials from '@/app/components/Testimonials';
import { getFooter } from '@/lib/contentful/footer';
import { getPage } from '@/lib/contentful/pages';
import { getTestimonialItems } from '@/lib/contentful/testimonials';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const SITE = 'Photon Health';

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
          url: '/images/open-graph/photon-health.jpg',
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

  const testimonialItems = await getTestimonialItems(
    '10hDTkGuvBM07WTHTgHIMi',
    false,
  );

  const { hero, bodyContentCollection } = page;

  return (
    <>
      <main className="l-main">
        {hero && (
          <Hero
            title={hero.title}
            titleSize={hero.titleSize}
            mobileTitle={hero.mobileTitle}
            subtitle={hero.subtitle}
            crumb={hero.crumb}
            buttonText={hero.buttonText}
            buttonLink={hero.buttonLink}
            media={hero.media}
            centerImage={hero.centerImage}
            textColor={hero.textColor}
            bgColor={hero.backgroundColorPicker?.value}
            imageAlignment={hero.imageAlignment}
          />
        )}

        <BodyContent bodyContent={bodyContentCollection} />

        <SignUpForm show={slug === 'sign-up'} />

        {(slug === 'about-us' || slug === 'join-us') && (
          <div className="open-roles py-[40px]">
            <div className="l-container">
              <div className="flex flex-col items-center justify-between gap-[40px] lg:flex-row">
                <div className="md:w-1/2">
                  <Crumb label="Careers" borderStyles="border" />
                  <h2 className="mb-[20px] mt-[20px] text-[38px]">
                    Open Roles
                  </h2>
                  {/*<a href="/join-us" className="button-primary">
                  Careers Page
                </a>*/}
                  <h3 className="mt-[48px] text-[24px]">
                    Photon is fully staffed at the moment!
                  </h3>
                  <p className="mt-[16px] opacity-[.8]">
                    We’re not hiring right now, but we’re always interested in
                    connecting with great people. Join our Talent Network by
                    sharing your details, and we’ll reach out if something opens
                    up that’s a good fit.
                  </p>
                  <a
                    target="_blank"
                    href="https://wellfound.com/company/photon-health"
                    className="mt-[16px] flex items-center gap-2 font-normal"
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
                <div className="testimonials--small w-full max-w-full lg:w-[770px]">
                  <Testimonials
                    titleStyles="mb-[20px] leading-1 md:m-0 md:m-[40px] text-[21px] md:text-[32px]"
                    items={testimonialItems}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer showTestDriveSection footer={footer} />
    </>
  );
}
