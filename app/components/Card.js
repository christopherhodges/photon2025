'use client';
import ContentfulImage from '@/app/components/contentful-image';
import CrumbList from '@/app/components/CrumbList';
import CategoryList from '@/app/components/FilterList';
import { formatDate } from '@/lib/formatDate';
import { withBr } from '@/lib/withBr';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({
  className,
  crumbs,
  categories,
  date,
  title,
  description,
  image,
  imageTop = false,
  isCaseStudy,
  url,
}) => {
  const Wrapper = url ? Link : 'div';
  const wrapperProps = url ? { href: url } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={clsx(
        className,
        'card block bg-white',
        url && 'transition-shadow hover:shadow-md',
        imageTop && 'flex flex-col-reverse justify-end',
      )}
    >
      <div
        className={clsx(
          imageTop && !isCaseStudy && 'px-[24px] pb-[44px] pt-[32px]',
          imageTop && isCaseStudy && 'px-[24px] py-[32px]',
          !imageTop && !isCaseStudy && 'p-[24px]',
        )}
      >
        {crumbs.length !== 0 && (
          <div className="mb-[40px]">
            <CrumbList crumbs={crumbs} />
          </div>
        )}

        {(date || categories.length !== 0) && (
          <div className="mb-[24px] flex items-center gap-4">
            {categories.length !== 0 && (
              <CategoryList categories={categories} />
            )}
            {date && (
              <div className="pressura uppercase text-[var(--med-gray)]">
                {formatDate(date)}
              </div>
            )}
          </div>
        )}

        {isCaseStudy && (
          <div className="flex items-center justify-between">
            <h3 className="text-[24px] font-normal">{withBr(title)}</h3>
            <span className="flex gap-2">
              <div className="whitespace-nowrap text-xs">Case Study</div>
              <Image
                className="invert"
                width={10}
                height={11}
                src="/icons/arrow-right-up.svg"
                alt=""
              />
            </span>
          </div>
        )}
        {!isCaseStudy && (
          <h3 className="text-[24px] font-normal">{withBr(title)}</h3>
        )}
        {description && (
          <p
            className={clsx('mt-[10px] leading-6 text-[#121212] opacity-[.8]')}
          >
            {description}
          </p>
        )}
      </div>
      <div className={clsx(imageTop && 'sm:h-[280px]')}>
        <ContentfulImage
          className={clsx(
            'h-full w-full sm:min-h-[250px] sm:object-cover',
            !imageTop && 'mt-auto',
          )}
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.title}
        />
      </div>
    </Wrapper>
  );
};

export default Card;
