import AuthoredBy from '@/app/components/AuthoredBy';
import ContentfulImage from '@/app/components/contentful-image';
import CrumbList from '@/app/components/CrumbList';
import RichText from '@/app/components/RichText';
import Testimonials from '@/app/components/Testimonials';
import { getCaseStudy } from '@/lib/contentful/caseStudies';
import { notFound } from 'next/navigation';

const SITE = 'Photon Health';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { page } = await getCaseStudy(slug);

  if (!page) return {};

  const title = page.metaTitle ? page.metaTitle : page.title;

  return {
    title: title ? `${title} | ${SITE}` : SITE,
    description: page.metaDescription,
    metadataBase: new URL('https://photon.health'),
    openGraph: {
      images: [
        {
          url: '/images/open-graph/photon-health.jpg',
          width: 5120,
          height: 2880,
          alt: 'Photon Health',
        },
      ],
    },
  };
}
export default async function CaseStudy({ params }) {
  params = await params;
  const { slug } = params;
  const { page } = await getCaseStudy(slug, false);

  const crumbs = page.crumbListCollection?.items ?? [];

  if (!page) return notFound();

  return (
    <div className="single-entry">
      <div className="l-container l-container--sm pt-[133px]">
        <header className="mb-[40px] flex flex-col gap-[40px]">
          {crumbs.length !== 0 && (
            <CrumbList
              borderStyles="first:border-[#DBDBDB] first:border-2 bg-[#E8EAF0] first:bg-transparent"
              crumbs={crumbs}
            />
          )}
          <h1 className="text-[38px]">{page.title}</h1>
          <p className="text-[24px] text-[var(--med-gray)]">{page.subtitle}</p>
          <AuthoredBy
            name={page.author}
            image={page.authorImage}
            date={page.date}
          />
          <ContentfulImage
            className="rounded-[16px]"
            src={page.coverImage.url}
            alt={page.coverImage.title}
            width={page.coverImage.width}
            height={page.coverImage.height}
          />
        </header>
      </div>
      {page.featuredTestimonial && (
        <Testimonials
          className="mx-auto max-w-[1440px] p-[20px] lg:p-[40px]"
          items={[page.featuredTestimonial]}
        />
      )}
      <div className="basic-content">
        <div className="l-container">
          <RichText
            key={page.sys.id}
            document={page.content.json}
            links={page.content.links}
          />
        </div>
      </div>
    </div>
  );
}
