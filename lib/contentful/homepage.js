import fetchGraphQL from '@/lib/utils/fetchGraphQL';

const HOME_FIELDS = `
  heroTitle
  heroSubtitle
  heroMedia { url width height contentType title }
  sectionsCollection { items { __typename ... on Section { title body } } }
`;

export async function getHome(preview = false) {
  const res = await fetchGraphQL(
    `
      query GetHome($preview: Boolean!) {
        homeCollection(preview: $preview, limit: 1) {
          items { ${HOME_FIELDS} }
        }
      }
    `,
    preview,
  );

  return res?.data?.homeCollection?.items?.[0] ?? null;
}
