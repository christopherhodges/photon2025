/** @type {import('next').NextConfig} */
module.exports = {
  /* Pretty URL → internal route -------------------------- */
  async rewrites() {
    return [
      {
        // exclude _next, api, etc. so they don’t collide
        source:
          '/:slug((?!api|_next|robots\\.txt|sitemap\\.xml|favicon\\.ico).+)',
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
