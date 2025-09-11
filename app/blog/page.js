import BlogFilterList from '@/app/components/BlogFilterList';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { getFooter } from '@/lib/contentful/footer';
import { getAllPosts } from '@/lib/contentful/posts';
import { getBlurDataURL } from '@/lib/contentfulBlur';

const SITE = 'Photon Health';
const pageTitle = '';

export const metadata = {
  title: pageTitle ? `${pageTitle} | ${SITE}` : SITE,
  description: 'Latest news & insights from Photon Health',
};

async function addBlurToCards(cards = []) {
  return Promise.all(
    cards.map(async c => {
      const image = c.coverImage ?? null;
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

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [footer] = await Promise.all([getFooter()]);
  const cards = await addBlurToCards(posts);

  return (
    <>
      <main className="l-main">
        <Hero title="Photon Blogs" />

        <BlogFilterList initialPosts={cards} />
      </main>
      <Footer footer={footer} />
    </>
  );
}

export const revalidate = 60;
