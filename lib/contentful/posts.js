import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getAllPosts(isDraftMode = false) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          slug
          title
          coverImage {
            url
          }
          date
          author {
            name
            picture {
              url
            }
          }
          excerpt
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
    }`,
    isDraftMode,
  );
  return entries?.data?.postCollection?.items;
}

export async function getPost(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
        items {
          slug
          title
          coverImage {
            url
          }
          date
          author {
            name
            picture {
              url
            }
          }
          excerpt
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
    }`,
    preview,
  );

  return {
    post: entry.fetchResponse?.data?.postCollection?.items?.[0],
  };
}
