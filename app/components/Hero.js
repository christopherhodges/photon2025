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
        'hero relative mt-[35px] w-full',
        media ? 'h-dvh max-h-[822px]' : 'pt-[200px]',
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
            className="mx-auto mt-auto h-auto"
            src={centerImage.url}
            width={centerImage.width}
            height={centerImage.height}
            alt={title}
          />
        </div>
      )}
      <div
        className={clsx(
          'l-container relative z-0 flex items-end pb-[40px]',
          media !== null ? 'h-dvh max-h-[822px]' : '',
        )}
      >
        <div className="w-full">
          <PageTitle
            className={clsx(
              pathname === '/' ? 'min-w-[460px]' : 'min-w-[400px]',
              media && titleSize === 'Small (38px)'
                ? 'text-[38px]'
                : 'text-[48px]',
              media ? 'w-1/4 capitalize' : 'max-w-[702px] text-[66px]',
            )}
            title={title}
          />
          <p
            className={clsx(
              'pt-[30px] font-light opacity-[.8]',
              media ? 'md:w-1/3' : 'w-full text-[24px]',
            )}
          >
            {subtitle}
          </p>

          {!media && (
            <div
              className="bg-gradient-primary my-[40px] h-[13px]"
              style={{ '--tw-gradient-angle': '270deg' }}
            ></div>
          )}

          {pathname === '/' && (
            <TestDriveForm
              className="mb-[40px] mt-[30px] w-full max-w-[464px]"
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
