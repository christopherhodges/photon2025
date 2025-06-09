import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getNavigationMenu(preview = false) {
  const rsp = await fetchGraphQL(
    `
      query {
        navigationMenuCollection(limit: 1, preview: false) {
          items {
            title
            logo {
              url
              width
              height
              description
            }
            itemsCollection {                # array of NavLink | NavGroup
              items {
                ... on NavLink  {
                  __typename
                  label
                  href
                  style                # "default" | "primary" | "outline"
                  external                   
                 }
                ... on NavGroup {
                  __typename
                  label
                  linksCollection {                # array of NavLink references
                    items {
                      label
                      href
                      shortDescription
                      style                # "default" | "primary" | "outline"
                      external
                      icon {
                        url
                        width
                        height
                      } 
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    preview,
  );

  return rsp?.data?.navigationMenuCollection?.items?.[0] ?? null;
}
