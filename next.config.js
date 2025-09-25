/** @type {import('next').NextConfig} */
const { fetchSheetRedirects } = require('./lib/redirects-from-sheet');

module.exports = {
  images: {
    // loader: 'custom',   // ← uncomment if you still use your Contentful loader
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'downloads.ctfassets.net' },
      { protocol: 'https', hostname: 'images.contentful.com' },
    ],
  },

  /* Pretty URL → internal route ----------------------------------- */
  async rewrites() {
    return [
      {
        source: '/:slug([^/]+)',
        destination: '/page/:slug',
      },
    ];
  },

  /* Internal URL → canonical pretty URL  +  Sheet-based redirects -- */
  async redirects() {
    const sheetRedirects = await fetchSheetRedirects();

    // keep your existing internal → pretty redirect
    const canonical = [
      {
        source: '/page/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];

    // Order matters: specific sheet redirects first, then the fallback
    return [...sheetRedirects, ...canonical];
  },
};
