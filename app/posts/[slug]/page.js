import { draftMode } from 'next/headers';

import { getAllPosts, getPost } from '@/lib/contentful/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);
  return allPosts.map(post => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { isEnabled } = draftMode();
  const { post } = await getPost(params.slug, isEnabled);
  if (!post) notFound();
  return <h1>{post.title}</h1>;
}
