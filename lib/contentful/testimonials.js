import fetchGraphQL from '@/lib/utils/fetchGraphQL';
import gqlmin from 'gqlmin';

/**
 * Fetch the 4 latest testimonials for one TestimonialSlider entry.
 *
 * @param {string} id        Contentful entry ID, e.g. '10hDTkGuvBM07WTHTgHIMi'
 * @param {boolean} preview  true = draft content, false = published
 * @returns {Promise<Array>} Array of testimonial items
 */
export async function getTestimonialItems(id, preview = false) {
  const query = `
    query {
      testimonialSlider(id: "${id}", preview: ${preview}) {
        testimonialsCollection(limit: 4) {
          items {
            sys {id}
            name
            jobTitle
            testimonial { json }
            image { url height width title }
            logo  { url height width title }
          }
        }
      }
    }
  `;

  // minify (optional)
  const minifiedQuery = gqlmin(query);

  // fetchGraphQL(query, variablesObject)
  const { data } = await fetchGraphQL(minifiedQuery);

  // Return the plain array (never undefined)
  return data?.testimonialSlider?.testimonialsCollection?.items ?? [];
}
