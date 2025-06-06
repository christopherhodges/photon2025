import Header from '@/app/components/Header';
import '@/app/globals.scss';
import { getNavigationMenu } from '@/lib/contentful/header';

export default async function RootLayout({ children }) {
  const nav = await getNavigationMenu(false);

  return (
    <html lang="en">
      <body className="bg-neutral-300">
        <Header menu={nav} />
        <main>{children}</main>
      </body>
    </html>
  );
}
