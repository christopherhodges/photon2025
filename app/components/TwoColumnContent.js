'use client';
import ContentfulImage from '@/app/components/contentful-image';
import Crumb from '@/app/components/Crumb';
import RichText from '@/app/components/RichText';
import { BLOCKS } from '@contentful/rich-text-types';
import clsx from 'clsx';

const TwoColumnContent = ({
  className,
  title,
  crumb,
  content,
  textPlacement,
  img1,
  img2,
}) => {
  return (
    <div
      className={clsx(
        className,
        'two-column-content bg-white pb-[40px] pt-[40px]',
      )}
    >
      <div className="l-container">
        <div
          className={clsx(
            'flex flex-col items-stretch justify-between gap-10 lg:flex-row lg:items-stretch',
            textPlacement === 'Right' && 'lg:flex-row-reverse',
          )}
        >
          {content && (
            <>
              <div className="flex flex-col items-start gap-4 font-normal lg:w-1/2">
                <Crumb label={crumb} borderStyles="border" />
                {title && (
                  <h2 className="text-[38px] font-light leading-[105%]">
                    {title}
                  </h2>
                )}
                <RichText
                  document={content.json}
                  options={{
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children) => (
                        <p className="mb-[30px] text-[24px] leading-[28.8px]">
                          {children}
                        </p>
                      ),
                    },
                  }}
                />
              </div>
              {!img1 && !img2 && <div className="lg:w-1/2"></div>}
            </>
          )}
          {img1 && (
            <div className="overflow-hidden rounded-lg lg:w-1/2">
              <ContentfulImage
                className={!img2 ? 'h-full' : ''}
                src={img1.url}
                sizes="(max-width: 1024px) 100vw, 1024px"
                width={img1.width}
                height={img1.height}
                alt={img1.title}
              />
            </div>
          )}
          {img2 && (
            <div className="overflow-hidden rounded-lg lg:w-1/2">
              <ContentfulImage
                src={img2.url}
                width={img2.width}
                height={img2.height}
                alt={img2.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnContent;
