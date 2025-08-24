import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getAllPosts(isDraftMode = false) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }, order: [date_DESC, sys_publishedAt_DESC, sys_firstPublishedAt_DESC]) {
        items {
          sys {id}
          slug
          title
          coverImage {
            url
            width
            height
            title
          }
          date
          categories
          excerpt
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.postCollection?.items;
}

export async function getPost(slug, preview) {
  const query = `query {
     postCollection(where: { slug: "${slug}" }, preview: ${
       preview ? 'true' : 'false'
     }, limit: 1) {
         items {
          sys {id}
          slug
          title
          subtitle
          date
          author
          authorImage {
            url
            width
            height
            title
          }
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
              entries {
                  block {
                    __typename
                    ... on Testimonial {
                        sys {id}
                        testimonial {
                            json
                        }
                        name
                        showName
                        jobTitle
                        image {
                            url
                            width
                            height
                            title
                        }
                        logo {
                            url
                            width
                            height
                            title
                        }
                    }
                    ... on Video {
                      sys {id}
                      videoUrl
                    }
                    ... on ComponentSectionHeading {
                      sys {id}
                      title
                      crumbTitle
                    }  
                  }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  width
                  height
                  title
                  description
                  contentType
                }
              }
            }
          }
         }
      }
    }`;

  const entry = await fetchGraphQL(query);
  return {
    page: entry?.data?.postCollection?.items?.[0],
  };
}
