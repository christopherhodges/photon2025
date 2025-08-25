'use client';
import ContentfulImage from '@/app/components/contentful-image';
import CrumbList from '@/app/components/CrumbList';
import CategoryList from '@/app/components/FilterList';
import { formatDate } from '@/lib/formatDate';
import { withBr } from '@/lib/withBr';
import clsx from 'clsx';
import Link from 'next/link';

const Card = ({
  className,
  crumbs,
  categories,
  date,
  title,
  description,
  buttonText = 'View More',
  buttonLink,
  image,
  imageTop = false,
  imageFill = false,
  maxImageHeight,
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

        imageFill && 'flex h-full flex-col',
        imageTop && 'flex flex-col-reverse justify-end',
        isCaseStudy && 'card--case-study',
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
            <CrumbList borderStyles="border-[#DBDBDB]" crumbs={crumbs} />
          </div>
        )}

        {(date || categories.length !== 0) && (
          <div className="mb-[24px] flex flex-wrap items-center gap-4">
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
            <span className="flex items-center gap-2">
              <div className="whitespace-nowrap text-xs">Case Study</div>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.464 0.263977H0.536012C0.403695 0.263977 0.276797 0.319168 0.183234 0.417408C0.089672 0.515649 0.0371094 0.648892 0.0371094 0.787825C0.0371094 0.926758 0.089672 1.06 0.183234 1.15824C0.276797 1.25648 0.403695 1.31167 0.536012 1.31167H9.26225L0.185506 10.8423C0.139357 10.8907 0.10275 10.9482 0.0777743 11.0116C0.0527988 11.0749 0.0399437 11.1427 0.0399437 11.2112C0.0399437 11.2798 0.0527988 11.3476 0.0777743 11.4109C0.10275 11.4743 0.139357 11.5318 0.185506 11.5802C0.231654 11.6287 0.286441 11.6671 0.346737 11.6933C0.407033 11.7196 0.471658 11.7331 0.536922 11.7331C0.602186 11.7331 0.666811 11.7196 0.727108 11.6933C0.787404 11.6671 0.84219 11.6287 0.888339 11.5802L9.96509 2.04869V11.2122C9.96509 11.3511 10.0176 11.4844 10.1112 11.5826C10.2048 11.6809 10.3317 11.736 10.464 11.736C10.5963 11.736 10.7232 11.6809 10.8168 11.5826C10.9103 11.4844 10.9629 11.3511 10.9629 11.2122V0.785913C10.9619 0.647467 10.909 0.515006 10.8156 0.417286C10.7222 0.319567 10.5958 0.264477 10.464 0.263977Z"
                  fill="currentColor"
                />
              </svg>
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
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="button-primary button--black mt-[20px] inline-block"
          >
            {buttonText}
          </a>
        )}
      </div>
      <div
        className={clsx(
          'card__image-wrapper relative',
          imageFill
            ? 'min-h-[180px] grow'
            : `h-[${image.height}px] max-h-[200px] md:max-h-none`,
        )}
        style={{ height: maxImageHeight ? maxImageHeight : '300px' }}
      >
        <ContentfulImage
          className={clsx('h-full w-full object-cover', !imageTop && 'mt-auto')}
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
