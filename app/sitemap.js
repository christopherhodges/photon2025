import { SITE_URL } from '@/lib/constants';
import { getAllCaseStudies } from '@/lib/contentful/caseStudies';
import { getAllPages } from '@/lib/contentful/pages';
import { getAllPosts } from '@/lib/contentful/posts';

// Next.js metadata route: generates /sitemap.xml at build time
export default async function sitemap() {
  const baseUrl = SITE_URL.replace(/\/$/, '');

  const [pages = [], posts = [], caseStudies = []] = await Promise.all([
    getAllPages(false).catch(() => []),
    getAllPosts(false).catch(() => []),
    getAllCaseStudies(false).catch(() => []),
  ]);

  const pageEntries = pages
    .map(({ slug }) => {
      if (!slug) return null;
      const path = slug === '/' ? '/' : `/${String(slug).replace(/^\/?/, '')}`;
      return { url: `${baseUrl}${path}` };
    })
    .sort()
    .filter(Boolean);

  const blogEntries = posts
    .map(({ slug, date }) => {
      if (!slug) return null;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: date ? new Date(date) : undefined,
      };
    })
    .filter(Boolean);

  const caseStudyEntries = caseStudies
    .map(({ slug, date }) => {
      if (!slug) return null;
      return {
        url: `${baseUrl}/case-studies/${slug}`,
        lastModified: date ? new Date(date) : undefined,
      };
    })
    .filter(Boolean);

  // Add static index routes
  const staticEntries = [
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/case-studies` },
  ];

  const entries = [
    ...pageEntries,
    ...staticEntries,
    ...blogEntries,
    ...caseStudyEntries,
  ];

  const seen = new Set();
  return entries.filter(entry => {
    if (!entry?.url || seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
