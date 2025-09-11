import CardGrid from '@/app/components/CardGrid';
import ContentSlider from '@/app/components/ContentSlider';
import Footer from '@/app/components/Footer';
import {
  getAllCaseStudies,
  getFeaturedCaseStudies,
} from '@/lib/contentful/caseStudies';
import { getFooter } from '@/lib/contentful/footer';
import { getBlurDataURL } from '@/lib/contentfulBlur';

const SITE = 'Photon Health';

const pageTitle = 'Case Studies';

export const metadata = {
  title: pageTitle ? `${pageTitle} | ${SITE}` : SITE,
  description: 'Photon Health case studies',
};

async function addBlurToCards(cards = []) {
  return Promise.all(
    cards.map(async c => {
      const image = c.image ?? c.coverImage ?? null;
      let blurDataURL = null;

      // Skip SVGs for blur placeholders
      if (image?.url && !/\.svg$/i.test(image.url)) {
        try {
          blurDataURL = await getBlurDataURL(image.url, {
            w: 24,
            q: 20,
            fm: 'jpg',
          });
        } catch {
          // ignore; fall back to no blur
        }
      }

      return {
        ...c,
        image: image ? { ...image, blurDataURL } : null,
      };
    }),
  );
}

export default async function CaseStudiesIndex() {
  let caseStudies = await getAllCaseStudies();
  let featuredCaseStudies = await getFeaturedCaseStudies();
  const [footer] = await Promise.all([getFooter()]);

  caseStudies = await addBlurToCards(caseStudies);
  featuredCaseStudies = await addBlurToCards(featuredCaseStudies);

  const cards = caseStudies.map(p => {
    console.log(p);
    return {
      title: p.featuredLinkTitle || p.title,
      crumbs: p.crumbListCollection?.items || [],
      isCaseStudy: true,
      key: p.sys.id,
      imageTop: true,
      image: {
        url: p.coverImage.url,
        width: p.coverImage.width,
        height: p.coverImage.height,
        title: p.coverImage.title || p.title,
        blurDataURL: p.image.blurDataURL,
      },
      url: `/case-studies/${p.slug}`,
    };
  });
  return (
    <>
      <main className="l-main">
        <div className="mb-[40px] bg-[var(--dark-blue)] pb-[60px] pt-[133px] text-white">
          <h1 className="text-center text-[38px] font-light">
            Photon in action
          </h1>
          {featuredCaseStudies.length > 0 && (
            <ContentSlider items={featuredCaseStudies} />
          )}
        </div>

        <CardGrid cards={cards} layout="two-up" />
      </main>
      <Footer footer={footer} />
    </>
  );
}

export const revalidate = 60;
