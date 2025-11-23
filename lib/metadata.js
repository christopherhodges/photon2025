import { SITE_NAME, SITE_URL } from './constants';

const defaultOgImage = {
  url: '/images/open-graph/photon-health.png',
  width: 5120,
  height: 2880,
  alt: SITE_NAME,
};

const toAbsoluteOgImage = image => {
  if (!image?.url) return { ...defaultOgImage };

  const { url, width, height, title } = image;
  const alt = title || image.alt || SITE_NAME;

  return {
    url: new URL(url, SITE_URL).toString(),
    width: width || defaultOgImage.width,
    height: height || defaultOgImage.height,
    alt,
  };
};

export function buildMetadata({ title, description, image, path, type } = {}) {
  const canonical = path ? new URL(path, SITE_URL).toString() : undefined;

  let metadata = {
    title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
    description: description,
    metadataBase: new URL(SITE_URL),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: title || SITE_NAME,
      url: canonical,
      type: type || 'website',
      description: description,
      images: [toAbsoluteOgImage(image)],
    },
  };
  return metadata;
}
