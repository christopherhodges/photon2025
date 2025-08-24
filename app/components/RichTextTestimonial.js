import ContentfulImage from '@/app/components/contentful-image';
import RichText from '@/app/components/RichText';
import { BLOCKS } from '@contentful/rich-text-types';
import clsx from 'clsx';
import { Children } from 'react';

export const RichTextTestimonial = ({
  showAuthor = true,
  testimonial,
  authorName,
  authorTitle,
  authorImage,
  logo,
  titleStyles,
}) => {
  const isEmpty = kids =>
    kids.length === 0 ||
    kids.every(
      child =>
        (typeof child === 'string' && child.trim() === '') || child === null,
    );
  return (
    <blockquote className="relative mb-[32px] flex items-start gap-4 rounded-r-2xl bg-[#F6F8FB] p-6 shadow">
      {/* Gradient bRichTextTestimonialar */}
      <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-fuchsia-500 via-red-400 to-sky-400" />
      {/* Quote & meta */}
      <div className="flex-1">
        <RichText
          document={testimonial}
          options={{
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => {
                const kidArray = Children.toArray(children); // normalise

                if (isEmpty(kidArray)) return null; // ← skip empty <p>

                return (
                  <p
                    className={clsx(
                      titleStyles ?? 'mb-[40px] text-[21px] lg:text-[38px]',
                    )}
                  >
                    &ldquo;{kidArray}&rdquo;
                  </p>
                );
              },
            },
          }}
        />
        <div className="mt-2 flex items-center gap-4">
          {(logo || authorImage) && (
            <div className="flex flex-row-reverse items-center">
              {logo && (
                <ContentfulImage
                  src={logo.url}
                  alt={`${authorName} logo`}
                  width={40}
                  height={40}
                  className="relative z-0 h-[40px] w-[40px] overflow-hidden rounded-lg object-contain"
                  draggable={false}
                />
              )}
              {authorImage && (
                <ContentfulImage
                  src={authorImage.url}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="z-1 relative h-[40px] w-[40px] rounded-full border-white object-cover ring-2 ring-white"
                  draggable={false}
                />
              )}
            </div>
          )}

          {showAuthor && (
            <div className="leading-snug">
              <div className="font-normal">{authorName}</div>
              {authorTitle && (
                <div className="text-gray-500">{authorTitle}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </blockquote>
  );
};
