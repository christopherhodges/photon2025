import gqlmin from 'gqlmin';

import fetchGraphQL from '@/lib/utils/fetchGraphQL';
const pagesQuery = `
        items {
          slug
          title
          subheading
        }
`;
const pageQuery = `
        items {
          slug
          title
          subheading
          hero {
            title
            titleSize
            subtitle
            media {
              contentType
              title
              url
              width
              height
            }
            centerImage {
              contentType
              title
              url
              width
              height
            }
            textColor
          }
          bodyContentCollection(limit:8){
            items {
                ... on ComponentLogoCarousel {
                    __typename
                    sectionTitle
                    logosCollection(limit:15) {
                        items {
                            url
                            width
                            height
                            title
                        }
                    }
                }
                ... on ComponentSectionHeading {
                    __typename
                    title
                    subtitle
                }
                ... on ComponentCardGrid {
                    __typename
                    cardCollection(limit: 3) {
                        items {
                            title
                            description
                            crumbsCollection(limit: 3) {
                                items {
                                    crumbTitle
                                    crumbIcon {
                                        url
                                        width
                                        height
                                        title
                                    }
                                }
                            }
                            image {
                              url
                              height
                              width
                              title
                            }
                        }
                        
                    }
                }
                ... on ComponentCaseStudiesSlider {
                    __typename
                    title
                    buttonLink
                    buttonText
                    crumb
                    caseStudiesCollection(limit: 6) {
                        items {
                            featuredLinkTitle
                            coverImage {
                                url
                                title
                                width
                                height
                            }
                            logo {
                              url
                              title
                              width
                              height
                            }
                            slug
                            externalLink
                        }
                    }
                }
                ... on TestimonialSlider {
                    __typename
                    testimonialsCollection(limit: 4) {
                        items {
                            name
                            jobTitle
                            testimonial {
                              json
                             }
                            image {
                                url
                                height
                                width
                                title
                            }
                            logo {
                                url
                                height
                                width
                                title
                            }
                        }
                    }
                }
            }
          }
        }`;

export async function getAllPages(isDraftMode) {
  const query = `query {
      pageCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        ${pagesQuery}
      }
    }`;
  const minifiedQuery = gqlmin(query);
  const entries = await fetchGraphQL(minifiedQuery);
  return entries?.data?.pageCollection?.items;
}

export async function getPage(slug, preview) {
  const query = `query {
     pageCollection(where: { slug: "${slug}" }, preview: ${
       preview ? 'true' : 'false'
     }, limit: 1) {
        ${pageQuery}
      }
    }`;
  const minifiedQuery = gqlmin(query);
  const entry = await fetchGraphQL(minifiedQuery);
  return {
    page: entry?.data?.pageCollection?.items?.[0],
  };
}
