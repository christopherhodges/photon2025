import ContentfulImage from '@/app/components/contentful-image';
import RichText from '@/app/components/RichText';
import { BLOCKS } from '@contentful/rich-text-types';
import clsx from 'clsx';

export const Testimonial = ({
  testimonial,
  author_name,
  author_title,
  author_image,
  logo,
  titleStyles,
}) => {
  return (
    <>
      <header className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="flex flex-row-reverse items-center">
          {logo && (
            <ContentfulImage
              src={logo}
              alt={`${author_name} logo`}
              width={40}
              height={40}
              className="relative z-0 h-[40px] w-[40px] overflow-hidden rounded-lg object-contain"
              draggable={false}
            />
          )}
          {author_image && (
            <ContentfulImage
              src={author_image}
              alt={author_name}
              width={56}
              height={56}
              className="z-1 relative h-[50px] w-[50px] rounded-full border-white object-cover ring-4 ring-white"
              draggable={false}
            />
          )}
        </div>
        <div className="text-center md:text-left">
          <p className="text-[18px] font-semibold sm:text-[16px]">
            {author_name}
          </p>
          <p className="text-sm text-gray-500">{author_title}</p>
        </div>
      </header>

      {/* ── Quote ── */}
      <blockquote className="richText mx-auto max-w-[860px] px-[10px] text-center leading-snug text-black">
        <RichText
          document={testimonial}
          options={{
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_, children) => (
                <p
                  className={clsx(
                    titleStyles ?? 'mb-[40px] text-[21px] lg:text-[38px]',
                  )}
                >
                  {children}
                </p>
              ),
            },
          }}
        />
      </blockquote>
    </>
  );
};
