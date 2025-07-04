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
          metaTitle
          metaDescription
          hero {
            title
            titleSize
            mobileTitle
            subtitle
            mobileImageVideo {
              title
              url
              width
              height
            }
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
          bodyContentCollection(limit:15){
            items {
                ... on ComponentLogoCarousel {
                    __typename
                    sys { id } 
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
                    sys { id } 
                    title
                    subtitle
                }
                ... on ComponentCardGrid {
                    __typename
                    sys { id } 
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
                    sys { id } 
                    title
                    subtitle
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
                    sys { id } 
                    testimonialsCollection(limit: 6) {
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
                ... on ComponentFeaturedPost {
                    __typename
                    sys { id } 
                    title
                    crumb
                    postsCollection(limit: 2) {
                        items {
                            title
                            externalLink
                            coverImage {
                                url
                                width
                                height
                                title
                            }
                        }
                    }
               }
               ... on Component2Columns {
                    __typename
                    sys { id } 
                    crumb
                    title
                    content {
                        json
                    }
                    textPlacement
                    featureImage1 {
                        url
                        width
                        height
                        title
                    }
                    featureImage2 {
                        url
                        width
                        height
                        title
                    }
               }
               ... on Component3Columns {
                    __typename
                    sys { id } 
                    mainCrumb
                    cardsCollection {
                        items {
                            title
                            description
                            crumbsCollection(limit: 1) {
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
               ... on ComponentBasicContent {
                  __typename
                  sys { id } 
                  content {
                      json
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
