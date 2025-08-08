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
    page: entry?.data?.postCollection?.items?.[0],
  };
}
