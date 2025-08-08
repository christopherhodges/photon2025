import CardGrid from '@/app/components/CardGrid';
import ContentSlider from '@/app/components/ContentSlider';
import {
  getAllCaseStudies,
  getFeaturedCaseStudies,
} from '@/lib/contentful/caseStudies';

const SITE = 'Photon Health';

const pageTitle = 'Case Studies';

export const metadata = {
  title: pageTitle ? `${pageTitle} | ${SITE}` : SITE,
  description: 'Photon Health case studies',
};

export default async function CaseStudiesIndex() {
  const caseStudies = await getAllCaseStudies();
  const featuredCaseStudies = await getFeaturedCaseStudies();

  const cards = caseStudies.map(p => {
    return {
      title: p.featuredLinkTitle || p.title,
      crumbs: p.crumbListCollection?.items || [],
      isCaseStudy: true,
      imageTop: true,
      image: {
        url: p.coverImage.url,
        width: p.coverImage.width,
        height: p.coverImage.height,
        alt: p.coverImage.title || p.title,
      },
      url: `/case-studies/${p.slug}`,
    };
  });
  return (
    <>
      <div className="mb-[40px] bg-[var(--dark-blue)] pb-[60px] pt-[133px] text-white">
        <h1 className="text-center text-[38px] font-light">Photon in action</h1>
        {featuredCaseStudies.length > 0 && (
          <ContentSlider items={featuredCaseStudies} />
        )}
      </div>

      <CardGrid cards={cards} layout="two-up" />
    </>
  );
}

export const revalidate = 60;
