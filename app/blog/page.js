import BlogFilterList from '@/app/components/BlogFilterList';
import Hero from '@/app/components/Hero';
import { getAllPosts } from '@/lib/contentful/posts';

const SITE = 'Photon Health';
const pageTitle = '';

export const metadata = {
  title: pageTitle ? `${pageTitle} | ${SITE}` : SITE,
  description: 'Latest news & insights from Photon Health',
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero title="Photon Blogs" />

      <BlogFilterList initialPosts={posts} />
    </>
  );
}

export const revalidate = 60;
