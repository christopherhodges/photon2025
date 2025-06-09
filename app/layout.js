import AnnouncementBar from '@/app/components/AnnouncementBar';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
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
      </Head>
      <html lang="en" className={clsx(acidGrotesk.className)}>
        <body>
          <main className="l-main">
            <AnnouncementBar content="Announcement Bar" />
            <Header menu={nav} />
            {children}
          </main>
          <Footer footer={footer} />
        </body>
      </html>
    </>
  );
}
