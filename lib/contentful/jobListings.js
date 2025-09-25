import fetchGraphQL from '@/lib/utils/fetchGraphQL';

export async function getAllJobListings() {
  const entries = await fetchGraphQL(
    `query {
      jobListingCollection(where: { jobCategory_exists: true }, preview: false) {
        items {
          sys {id}
          jobTitle
          shortDescription,
          jobLocation
          link
          jobLevel
          jobCategory
      }
    }
    }`,
  );
  return entries?.data?.jobListingCollection?.items;
}
