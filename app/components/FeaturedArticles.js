'use client';
import Crumb from '@/app/components/Crumb';
import ContentfulImage from '@/app/components/contentful-image';
import Image from 'next/image';

const FeaturedArticles = ({ sectionTitle, crumb, items }) => {
  return (
    <div className="featured-posts bg-gradient-secondary--reversed pt-[64px]">
      <div className="l-container pb-[60px] md:pb-[106px]">
        <Crumb
          label={crumb}
          textColor="text-white"
          borderStyles="border-2 border-white/25"
        />
        <h2
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
          className="my-[24px] text-[38px] font-light text-white"
        ></h2>

        <div className="flex flex-col gap-8 md:flex-row">
          {items.map((post, i) => {
            return (
              <a target="_blank" key={i} href={post.externalLink}>
                <ContentfulImage
                  src={post.coverImage.url}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  className="rounded-[16px]"
                  alt={post.coverImage.title}
                />
                <div className="mt-[24px] flex justify-between md:items-center">
                  <h3 className="max-w-[291px] text-[32px] font-light text-white md:max-w-none">
                    {post.title}
                  </h3>
                  <Image
                    width={20}
                    height={21}
                    src="/icons/arrow-right-up.svg"
                    alt="Up Right Arrow"
                    className="mt-[10px] h-[21px] w-[20px] md:mt-0"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
