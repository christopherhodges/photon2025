'use client';
import Crumb from '@/app/components/Crumb';
import TestDriveForm from '@/app/components/TestDriveForm';
import ContentfulImage from '@/app/components/contentful-image';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const FeaturedArticles = ({ sectionTitle, crumb, items }) => {
  const pathname = usePathname();
  return (
    <div className="featured-posts bg-gradient-secondary--reversed pt-[64px]">
      <div className="l-container pb-[106px]">
        <Crumb
          label={crumb}
          textColor="text-white"
          borderStyles="border-2 border-white/25"
        />
        <h2
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
          className="my-[24px] text-[38px] font-light text-white"
        ></h2>

        <div className="flex gap-8">
          {items.map((post, i) => {
            console.log(post);
            return (
              <a key={i} href={post.externalLink}>
                <ContentfulImage
                  src={post.coverImage.url}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  className="rounded-[16px]"
                  alt={post.coverImage.title}
                />
                <div className="mt-[24px] flex items-center justify-between">
                  <h3 className="text-[32px] font-light text-white">
                    {post.title}
                  </h3>
                  <Image
                    width={20}
                    height={21}
                    src="/icons/arrow-right-up.svg"
                    alt="Up Right Arrow"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
      {pathname === '/' && (
        <div className="pb-[40px]">
          <TestDriveForm
            className="mx-auto w-full max-w-[670px] text-white"
            title="Subscribe to our newsletter"
            inputPlaceholder="Enter your email address"
            buttonLabel="Try it out"
            additionalText="This is just a test script. Not real, not fillable, and definitely not reaching a pharmacy near you."
          />
        </div>
      )}
    </div>
  );
};

export default FeaturedArticles;
