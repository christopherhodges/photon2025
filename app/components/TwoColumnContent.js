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
    <div className={clsx(className, 'two-column-content bg-white pt-[64px]')}>
      <div className="l-container">
        <div
          className={clsx(
            'flex items-stretch justify-between gap-10',
            textPlacement === 'Right' && 'flex-row-reverse',
          )}
        >
          {content && (
            <>
              <div className="flex w-1/2 flex-col items-start gap-4 font-normal">
                <Crumb label={crumb} borderStyles="border" />
                <h2 className="text-[38px] leading-[105%]">{title}</h2>
                <RichText
                  document={content.json}
                  options={{
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children) => (
                        <p className="mb-[30px] text-[24px]">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
              {!img1 && !img2 && <div className="w-1/2"></div>}
            </>
          )}
          {img1 && (
            <div className="w-1/2">
              <ContentfulImage
                src={img1.url}
                width={img1.width}
                height={img1.height}
                alt={img1.title}
              />
            </div>
          )}
          {img2 && (
            <div className="w-1/2">
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
