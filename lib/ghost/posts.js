import GhostContentAPI from '@tryghost/content-api';
import { readingTime } from '@tryghost/helpers';
import { SITE_NAME } from '../constants';

const api = (() => {
  const url = process.env.GHOST_CONTENT_API_URL?.replace(/\/$/, '');
  const key = process.env.GHOST_CONTENT_API_KEY;
  if (!url || !key) return null;

  return new GhostContentAPI({
    url,
    key,
    version: 'v5.0',
  });
})();

const mapGhostPost = post => {
  if (!post) return null;

  const author = post.primary_author || post.authors?.[0] || null;
  const imageDims = post.feature_image_dimensions || {};
  const coverImage = post.feature_image
    ? {
        url: post.feature_image,
        width: imageDims.width || 1200,
        height: imageDims.height || 630,
        title: post.feature_image_alt || post.title,
      }
    : null;

  const authorImage = author?.profile_image
    ? {
        url: author.profile_image,
        width: 80,
        height: 80,
        title: author.name || SITE_NAME,
      }
    : null;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.excerpt,
    categories: (post.tags || []).map(t => t.name).filter(Boolean),
    date: post.published_at,
    author: author?.name,
    authorImage,
    coverImage,
    readingTime: readingTime(post, {
      minute: 'Quick read',
      minutes: '% minute read',
    }),
    contentHtml: post.html,
  };
};

export async function getAllGhostPosts() {
  if (!api)
    throw new Error('Missing GHOST_CONTENT_API_URL or GHOST_CONTENT_API_KEY');
  const posts = await api.posts.browse({
    filter: 'tag:-case-study',
    limit: '100',
    include: ['authors', 'tags'],
    formats: ['html'],
    order: 'published_at DESC',
  });
  return (posts || []).map(mapGhostPost).filter(Boolean);
}

export async function getGhostPost(slug) {
  if (!api)
    throw new Error('Missing GHOST_CONTENT_API_URL or GHOST_CONTENT_API_KEY');
  const post = await api.posts.read(
    { slug },
    { include: ['authors', 'tags'], formats: ['html'] },
  );
  return mapGhostPost(post);
}
