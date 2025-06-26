import AnnouncementBar from '@/app/components/AnnouncementBar';
import BodyClass from '@/app/components/BodyClass';
import Footer from '@/app/components/Footer';
import HeaderFull from '@/app/components/HeaderFull';
import '@/app/globals.scss';
import { getFooter } from '@/lib/contentful/Footer';
import { getNavigationMenu } from '@/lib/contentful/header';
import { acidGrotesk } from '@/lib/fonts';
import clsx from 'clsx';
import Head from 'next/head';

export default async function RootLayout({ children }) {
  const nav = await getNavigationMenu(false);
  const footer = await getFooter(false);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FFFAcidGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GT-Pressura-LC-Mono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/*-- Google Tag Manager */} <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-5KGPPZ9');</script> {/* End Google Tag Manager */}
      </Head>
      <html lang="en" className={clsx(acidGrotesk.className)}>
        <body className="text-[14px] lg:text-[16px]">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KGPPZ9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          <BodyClass />
          <main className="l-main">
            <AnnouncementBar content="Announcement Bar" />
            {/*<Header menu={nav} />*/}
            <HeaderFull menu={nav} />
            {children}
          </main>
          <Footer footer={footer} />
        </body>
      </html>
    </>
  );
}
