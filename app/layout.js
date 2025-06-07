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
          href="/fonts/AcidGrotesk-Light-TRIAL.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AcidGrotesk-Bold-TRIAL.woff2"
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
        <body className="bg-neutral-300">
          <main className="l-main">
            <Header menu={nav} />
            {children}
          </main>
          <Footer footer={footer} />
        </body>
      </html>
    </>
  );
}
