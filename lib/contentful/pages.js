import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getAllPages(isDraftMode) {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          slug
          title
          subheading
          hero {
            title
            subtitle
            media {
              contentType
              title
              url
              width
              height
            }
            textColor
          }
        }
      }
    }`,
  );
  return entries?.data?.pageCollection?.items;
}

export async function getPage(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
     pageCollection(where: { slug: "${slug}" }, preview: ${
       preview ? 'true' : 'false'
     }, limit: 1) {
        items {
          slug
          title
          subheading
          hero {
            title
            subtitle
            media {
              contentType
              title
              url
              width
              height
            }
            textColor
          }
        }
      }
    }`,
  );
  return {
    page: entry?.data?.pageCollection?.items?.[0],
  };
}
