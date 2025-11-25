import BlogFilterList from '@/app/components/BlogFilterList';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { SITE_NAME } from '@/lib/constants';
import { getFooter } from '@/lib/contentful/footer';
import { getBlurDataURL } from '@/lib/contentfulBlur';
import { getAllGhostPosts } from '@/lib/ghost/posts';
import { buildMetadata } from '@/lib/metadata';

const pageTitle = '';

export const metadata = buildMetadata({
  title: pageTitle || SITE_NAME,
  description: 'Latest news & insights from Photon',
  path: '/blog',
});

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
  const posts = await getAllGhostPosts();
  const [footer] = await Promise.all([getFooter()]);
  const cards = await addBlurToCards(posts);

  return (
    <>
      <main className="l-main">
        <Hero title="Photon Blog" />

        <BlogFilterList initialPosts={cards} />
      </main>
      <Footer footer={footer} />
    </>
  );
}

export const revalidate = 60;
