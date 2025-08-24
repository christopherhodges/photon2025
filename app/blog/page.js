import BlogFilterList from '@/app/components/BlogFilterList';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import { getFooter } from '@/lib/contentful/footer';
import { getAllPosts } from '@/lib/contentful/posts';

const SITE = 'Photon Health';
const pageTitle = '';

export const metadata = {
  title: pageTitle ? `${pageTitle} | ${SITE}` : SITE,
  description: 'Latest news & insights from Photon Health',
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [footer] = await Promise.all([getFooter()]);

  return (
    <>
      <main className="l-main">
        <Hero title="Photon Blogs" />

        <BlogFilterList initialPosts={posts} />
      </main>
      <Footer footer={footer} />
    </>
  );
}

export const revalidate = 60;
