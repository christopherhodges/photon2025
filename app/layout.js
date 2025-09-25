import AnnouncementBar from '@/app/components/AnnouncementBar';
import BodyClass from '@/app/components/BodyClass';
import HeaderFull from '@/app/components/HeaderFull';
import LoadingOverlay from '@/app/components/LoadingOverlay';
import '@/app/globals.scss';
import { getAnnouncementBar } from '@/lib/contentful/announcementBar';
import { getNavigationMenu } from '@/lib/contentful/header';
import { acidGrotesk } from '@/lib/fonts';
import clsx from 'clsx';
import Script from 'next/script';

export const metadata = {
  icons: {
    icon: '/images/favicon.png', // default 32×32/any-size icon
    shortcut: '/images/favicon.png', // for Safari “pinned” shortcuts
    apple: '/images/favicon.png', // iOS home-screen
  },
};

export default async function RootLayout({ children }) {
  const [menu] = await Promise.all([getNavigationMenu()]);

  const announcementBar = await getAnnouncementBar(
    '2K0dYmbxNqxQ7HsObSFvru',
    false,
  );

  return (
    <>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',
            '${process.env.NEXT_PUBLIC_GTM_ID}');`,
        }}
      />
      <html lang="en" className={clsx(acidGrotesk.className)}>
        <body className="lg:text-[16px]">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5KGPPZ9"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <BodyClass />

          <LoadingOverlay minDuration={3000} oncePerSession={true} />

          <AnnouncementBar
            text={announcementBar.text}
            link={announcementBar.link}
            showOnSite={announcementBar.showOnSite}
          />
          <HeaderFull menu={menu} />
          {children}
        </body>
      </html>
    </>
  );
}
