import BodyContent from '@/app/components/BodyContent';
import Crumb from '@/app/components/Crumb';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import JobListings from '@/app/components/JobListings';
import { SignUpForm } from '@/app/components/SignUpForm';
import Testimonials from '@/app/components/Testimonials';
import { getFooter } from '@/lib/contentful/footer';
import { getAllJobListings } from '@/lib/contentful/jobListings';
import { getPage } from '@/lib/contentful/pages';
import { getTestimonialItems } from '@/lib/contentful/testimonials';
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
  const jobs = await getAllJobListings();
  const [footer] = await Promise.all([getFooter()]);

  if (!page) return notFound();

  const testimonialItems = await getTestimonialItems(
    '10hDTkGuvBM07WTHTgHIMi',
    false,
  );

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

        {(slug === 'about-us' || slug === 'join-us') && (
          <div className="open-roles py-[40px]">
            <div className="l-container">
              <Crumb label="Careers" borderStyles="border" />
              <h2 className="mb-[20px] mt-[20px] text-[38px]">Open Roles</h2>
              <a
                target="_blank"
                href="/careers"
                className="button-primary radius-sm"
              >
                Careers
              </a>
              {/*
                  <a
                    target="_blank"
                    href="https://wellfound.com/company/photon-health/jobs"
                    className="button-primary radius-sm"
                  >
                    View Open Roles
                  </a>
                  <h3 className="mt-[48px] text-[24px]">
                    We're hiring across the company
                  </h3>
                  <p className="mt-[16px] opacity-[.8]">
                    Join us in reshaping the future of pharmacy by giving
                    patients real ownership over their prescriptions. If you’re
                    excited to tackle complex healthcare challenges with a
                    fast-growing Brooklyn-based team, we’d love for you to
                    apply.
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
                  */}

              <div className="mt-8 flex w-full flex-col items-start justify-between gap-8 lg:flex-row">
                <div className="w-full lg:w-[45%]">
                  <JobListings jobs={jobs} />
                </div>

                <div className="testimonials--small w-full lg:w-[55%]">
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
      <Footer
        showTestDriveSection
        testDriveTitle={testDriveTitle}
        footer={footer}
      />
    </>
  );
}
