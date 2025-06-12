import ContentfulImage from '@/app/components/contentful-image';
import Crumb from '@/app/components/Crumb';
import clsx from 'clsx';

const LogoGrid = ({ className, title, logos }) => {
  const loopLogos = [...logos, ...logos];

  return (
    <div
      className={clsx(
        className,
        'logoGrid w-full overflow-hidden bg-white py-[35px]',
      )}
    >
      <div className="text-center">
        <Crumb label={title} />
      </div>
      {loopLogos.length && (
        <div className="relative mt-[24px] overflow-hidden">
          <ul className="flex w-max animate-marquee items-center">
            {loopLogos?.map((logo, i) => {
              return (
                <li
                  key={`${logo.title}-${logo.url}-${i}`}
                  className="mr-[128px] flex-none"
                >
                  <ContentfulImage
                    className="h-[62px] w-auto max-w-none"
                    src={logo.url}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.title}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogoGrid;
