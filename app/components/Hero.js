'use client';
import ContentfulImage from '@/app/components/contentful-image';
import Crumb from '@/app/components/Crumb';
import PageTitle from '@/app/components/PageTitle';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Hero = ({
  title,
  titleSize,
  mobileTitle,
  subtitle,
  media,
  centerImage,
  crumb,
  buttonText,
  buttonLink,
  textColor,
  bgColor,
  imageAlignment,
}) => {
  const pathname = usePathname();

  const alignment = imageAlignment?.toLowerCase() ?? 'Right';

  return (
    <>
      <section
        className={clsx(
          'hero relative w-full',
          media ? 'min-h-[50vh] lg:h-[822px]' : 'pt-[120px] lg:pt-[200px]',
          textColor === 'white' && media ? 'text-white' : 'text-black',
          bgColor && `min-h-[50vh]`,
          alignment,
        )}
        style={{ backgroundColor: bgColor }}
      >
        {media?.contentType?.includes('video') && (
          <div className="video absolute left-1/2 z-[-1] h-full w-full -translate-x-1/2">
            <video
              className="h-full w-full object-cover"
              src={media.url}
              autoPlay
              playsInline
              muted
            />
          </div>
        )}
        {media && media?.contentType?.includes('image') && (
          <div
            className={clsx(
              'absolute',
              pathname === '/marketplace'
                ? 'bottom-0 left-1/2 h-[85%] w-full max-w-[1440px] -translate-x-1/2 px-[20px] lg:px-[40px]'
                : 'left-0 top-0 z-[-1] h-full w-full',
            )}
          >
            <ContentfulImage
              priority
              className={clsx(
                'h-full w-full object-cover object-bottom',
                pathname === '/marketplace' && 'rounded-2xl',
              )}
              src={media.url}
              width={media.width}
              height={media.height}
              alt={title}
            />
          </div>
        )}

        <div
          className={clsx(
            'l-container l-container--hero__content relative z-0 flex flex-col-reverse pb-[40px] lg:flex-row lg:items-end',
            media && 'min-h-[50vh] lg:h-[822px]',
            pathname !== '/' && media && 'h-[570px]',
            bgColor ? 'justify-between' : 'justify-center lg:justify-start',
          )}
        >
          {centerImage && (
            <div
              className={clsx(
                'hero-center-image pointer-events-none absolute bottom-0 z-[0] hidden h-full w-full items-end lg:flex',
              )}
            >
              <ContentfulImage
                priority
                className="mx-auto mt-auto h-auto w-[254px] lg:w-[360px]"
                src={centerImage.url}
                width={centerImage.width}
                height={centerImage.height}
                alt={title}
              />
            </div>
          )}
          <div
            className={clsx(
              'hero__content w-full lg:mt-0',
              pathname === '/' &&
                media &&
                'mt-[160px] lg:mt-[140px] lg:max-w-[460px]',
              pathname !== '/' && media && 'mt-[auto] max-w-[400px] pb-[50px]',
              !media && 'max-w-none lg:mt-[120px]',
              bgColor && 'max-w-[618px]',
              pathname === '/marketplace' &&
                'px-[20px] lg:pl-[40px] lg:pr-0 lg:pt-0',
            )}
          >
            <div
              className={clsx(
                'mx-auto mt-[40px] lg:mx-0 lg:mt-0',
                !media ? 'max-w-none' : 'max-w-[335px] sm:max-w-[690px]',
              )}
            >
              {crumb && (
                <Crumb
                  size="sm"
                  borderStyles="border border-black mb-[40px]"
                  label={crumb}
                />
              )}
              <PageTitle
                className={clsx(
                  titleSize === 'Small (38px)'
                    ? 'lg:text-[38px]'
                    : !media && !centerImage
                      ? 'text-[66px]'
                      : 'text-[32px] lg:text-[48px]',
                  media && 'lg:max-w-[702px]',
                  mobileTitle && 'hidden md:block',
                )}
                title={title}
              />
              <PageTitle
                className="block text-[66px] md:hidden"
                title={mobileTitle}
              />
              <p
                className={clsx(
                  'pt-[30px] font-light opacity-[.8]',
                  !media && 'text-[24px]',
                )}
              >
                {subtitle}
              </p>
              {buttonText && buttonLink && (
                <a
                  href={buttonLink}
                  className="button-primary button--black mt-[20px] inline-block"
                >
                  {buttonText}
                </a>
              )}
            </div>

            {!media && !bgColor && (
              <div
                className="mb-[40px] mt-[40px] h-[13px] bg-gradient-primary"
                style={{ '--tw-gradient-angle': '270deg' }}
              ></div>
            )}

            {centerImage && (
              <div className="hero-center-image--mobile pointer-events-none z-[0] mt-[60px] h-full w-full lg:hidden">
                <ContentfulImage
                  priority
                  className="mx-auto mt-auto h-auto w-full"
                  src={centerImage.url}
                  width={centerImage.width}
                  height={centerImage.height}
                  alt={title}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {pathname === '/marketplace' && (
        <div className="l-container">
          <div
            className="mb-24px mt-[40px] h-[13px] bg-gradient-primary"
            style={{ '--tw-gradient-angle': '270deg' }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Hero;
