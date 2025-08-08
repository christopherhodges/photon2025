import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getAllCaseStudies(isDraftMode = false) {
  const entries = await fetchGraphQL(
    `query {
      caseStudyCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }, order: [date_DESC, sys_publishedAt_DESC, sys_firstPublishedAt_DESC]) {
        items {
          sys {id}
          slug
          title
          featuredLinkTitle
          coverImage {
              url
              title
              width
              height
          }
          crumbListCollection(limit: 10) {
              items {
                ... on CrumbListing {
                  sys {id}
                  crumbTitle
                  crumbIcon {
                    url
                    width
                    height
                    title
                  }
                }
              }
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.caseStudyCollection?.items;
}

export async function getFeaturedCaseStudies(isDraftMode = false) {
  const entries = await fetchGraphQL(
    `query {
      caseStudyCollection(where: { slug_exists: true, featured: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          sys {id}
          slug
          title
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
          crumbListCollection(limit: 10) {
              items {
                ... on CrumbListing {
                  sys {id}
                  crumbTitle
                  crumbIcon {
                    url
                    width
                    height
                    title
                  }
                }
              }
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.caseStudyCollection?.items;
}

export async function getCaseStudy(slug, preview) {
  const query = `query {
     caseStudyCollection(where: { slug: "${slug}" }, preview: ${
       preview ? 'true' : 'false'
     }, limit: 1) {
         items {
          sys {id}
          slug
          title
          subtitle
          coverImage {
              url
              title
              width
              height
          }
          crumbListCollection(limit: 10) {
              items {
                ... on CrumbListing {
                  crumbTitle
                  crumbIcon {
                    url
                    width
                    height
                    title
                  }
                }
              }
          }
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                }
              }
            }
          }
         }
      }
    }`;

  const entry = await fetchGraphQL(query);
  return {
    page: entry?.data?.caseStudyCollection?.items?.[0],
  };
}
