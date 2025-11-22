const JOBS_URL = 'https://api.gem.com/job_board/v0/photon/job_posts/';

function normalizeEmploymentType(type) {
  if (!type) return null;
  return type
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeJob(post = {}) {
  const departmentName = post.departments?.[0]?.name ?? 'Other';
  const locationName =
    post.location?.name ??
    post.offices?.[0]?.location?.name ??
    post.offices?.[0]?.name ??
    null;

  return {
    sys: { id: post.id, requisition_id: post.requisition_id },
    jobTitle: post.title ?? 'Open Role',
    // shortDescription:
    jobLocation: locationName,
    link: post.absolute_url,
    jobLevel: normalizeEmploymentType(post.employment_type),
    jobCategory: departmentName,
  };
}

export async function getAllJobListings() {
  try {
    const response = await fetch(JOBS_URL, { next: { revalidate: 300 } });
    if (!response.ok) {
      console.error('Failed to fetch job listings', response.status);
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data.map(normalizeJob);
  } catch (error) {
    console.error('Error fetching job listings', error);
    return [];
  }
}
