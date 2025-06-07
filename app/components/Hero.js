import PageTitle from '@/app/components/PageTitle';
import clsx from 'clsx';

const Hero = ({ title, subtitle, media, textColor }) => {
  console.log(media);
  console.log(textColor);
  return (
    <section
      className={clsx(
        'hero h-dvh w-full',
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
      <div className="l-container flex h-dvh items-end">
        <div className="w-full">
          <PageTitle className="w-1/4 min-w-[400px] capitalize" title={title} />
          <p className="mb-[40px] mt-[30px] md:w-1/3">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
