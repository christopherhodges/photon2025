import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getFooter(preview = false) {
  const rsp = await fetchGraphQL(
    `
      query {
        footerCollection(limit: 1, preview: false) {
          items {
            title
            subscribeTitle
            subscribePlaceholder
            subscribeBtnLabel
            subscribeDescription
            copyright
            logo {
              url
              width
              height
              description
            }
            linksCollection {
              items {
                ... on FooterLink  {
                  __typename
                  label
                  href
                 }
               
              }
            }
          }
        }
      }
    `,
    preview,
  );

  return rsp?.data?.footerCollection?.items?.[0] ?? null;
}
