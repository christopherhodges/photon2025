import fetchGraphQL from '@/lib/utils/fetchGraphQL';
import gqlmin from 'gqlmin';

/**
 * Fetch a single AnnouncementBar entry.
 *
 * @param {string} id      Contentful entry ID
 * @param {boolean} preview  Use `true` to hit the Preview API
 * @returns {Promise<object|null>}
 */
export async function getAnnouncementBar(id, preview = false) {
  const query = gqlmin(`
    query {
      announcementBar(id: "${id}", preview: ${preview}) {
        text
        link
        showOnSite
      }
    }
  `);

  const variables = { id, preview };
  const { data, errors } = await fetchGraphQL(query, variables);

  if (errors) {
    console.error(errors);
    return null;
  }

  return data?.announcementBar ?? null;
}
