'use client';
import ContentfulImage from '@/app/components/contentful-image';
import PageTitle from '@/app/components/PageTitle';
import TestDriveForm from '@/app/components/TestDriveForm';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Hero = ({
  title,
  titleSize,
  subtitle,
  media,
  centerImage,
  textColor,
}) => {
  const pathname = usePathname();
  return (
    <section
      className={clsx(
        'hero relative w-full',
        media
          ? 'h-[820px] lg:h-dvh lg:max-h-[822px]'
          : 'pt-[120px] lg:pt-[200px]',
        textColor === 'white' && media ? 'text-white' : 'text-black',
      )}
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
        <div className="absolute left-0 top-0 z-[-1] h-full w-full">
          <ContentfulImage
            className="h-full w-full object-cover object-bottom"
            src={media.url}
            width={media.width}
            height={media.height}
            alt={title}
          />
        </div>
      )}

      {centerImage && (
        <div className="pointer-events-none absolute bottom-0 z-[0] flex h-full w-full items-end">
          <ContentfulImage
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
          'l-container relative z-0 flex justify-center pb-[40px] lg:items-end lg:justify-start',
          media ? 'h-[820px] lg:h-dvh lg:max-h-[822px]' : '',
        )}
      >
        <div
          className={clsx(
            'w-full lg:mt-0',
            pathname === '/' && media && 'mt-[140px] max-w-[460px]',
            pathname !== '/' && media && 'mt-[auto] max-w-[400px]',
            !media && 'mt-[120px] max-w-none',
          )}
        >
          <PageTitle
            className={clsx(
              'text-[27px]',
              media && 'lg:text-[38px]',
              media && titleSize !== 'Small (38px)' && 'lg:text-[48px]',
              media ? 'capitalize' : 'text-[66px] lg:max-w-[702px]',
            )}
            title={title}
          />
          <p
            className={clsx(
              'pt-[30px] font-light opacity-[.8]',
              !media && 'text-[24px]',
            )}
          >
            {subtitle}
          </p>

          {!media && (
            <div
              className="my-[40px] h-[13px] bg-gradient-primary"
              style={{ '--tw-gradient-angle': '270deg' }}
            ></div>
          )}

          {pathname === '/' && (
            <TestDriveForm
              className="invisible mb-[40px] mt-[30px] w-full max-w-[464px] lg:visible"
              title="Test drive the patient experience"
              inputPlaceholder="Enter your phone number"
              buttonLabel="Try it out"
              additionalText="(This is just a demo. We promise not to send you any prescriptions.)"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
