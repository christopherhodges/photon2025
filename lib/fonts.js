import localFont from 'next/font/local';

export const acidGrotesk = localFont({
  variable: '--font-acid-grotesk', // optional: CSS custom-prop
  display: 'swap', // same as font-display
  src: [
    {
      path: '../public/fonts/FFFAcidGrotesk-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFFAcidGrotesk-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/FFFAcidGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFFAcidGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFFAcidGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFFAcidGrotesk-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const pressura = localFont({
  src: [
    { path: '../public/fonts/GT-Pressura-Mono-Regular.woff2', weight: '400' },
  ],
  variable: '--font-pressura',
  display: 'swap',
});
