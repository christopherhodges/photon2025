import gqlmin from 'gqlmin';

import fetchGraphQL from '@/lib/utils/fetchGraphQL';
// const testimonialsQuery = `query GetTestimonial(0) {
//   testimonialsCollection( where: { sys: { id: 0 } } limit: 1) {
//     sys { id }
//     title
//     items {
//             name
//             jobTitle
//             testimonial {
//               json
//              }
//             image {
//                 url
//                 height
//                 width
//                 title
//             }
//             logo {
//                 url
//                 height
//                 width
//                 title
//             }
//         }
//     }
//   }
// }`;

export async function getTestimonial(id) {
  const query = `query GetTestimonialSlider($id: String!) {
  testimonialSlider(id: "${id}"}) {
    __typename
    sys { id }
    testimonialsCollection(limit: 4) {
      items {
        name
        jobTitle
        testimonial { json }
        image  { url height width title }
        logo   { url height width title }
      }
    }
  }
}`;
  const minifiedQuery = gqlmin(query);
  const entry = await fetchGraphQL(minifiedQuery);
  console.log(entry);
  return {
    page: entry?.data?.testimonialsCollection?.items?.[0],
  };
}
