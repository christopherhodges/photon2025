/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    // remove: loader: "custom",
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'downloads.ctfassets.net' },
      { protocol: 'https', hostname: 'images.contentful.com' },
    ],
  },
  /* Pretty URL → internal route -------------------------- */
  async rewrites() {
    return [
      {
        // exclude _next, api, etc. so they don’t collide
        source: '/:slug([^/]+)',
        destination: '/page/:slug',
      },
    ];
  },

  /* Internal URL → canonical pretty URL ------------------ */
  async redirects() {
    return [
      {
        source: '/page/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};
