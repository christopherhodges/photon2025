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
        'hero relative mt-[35px] h-dvh max-h-[822px] w-full',
        textColor === 'white' ? 'text-white' : 'text-black',
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
      <div className="l-container relative z-0 flex h-dvh max-h-[822px] items-end pb-[40px]">
        <div className="w-full">
          <PageTitle
            className={clsx(
              'w-1/4 capitalize',
              pathname === '/' ? 'min-w-[460px]' : 'min-w-[400px]',
              titleSize === 'Small (38px)' ? 'text-[38px]' : 'text-[48px]',
            )}
            title={title}
          />
          <p className="pt-[30px] font-light opacity-[.8] md:w-1/3">
            {subtitle}
          </p>

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
