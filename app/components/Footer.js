import Image from 'next/image';
import Link from 'next/link';

const Footer = footer => {
  const footerItems = footer.footer;
  console.log(footerItems);
  const footerLinks = footerItems.linksCollection.items;
  return (
    <footer className="l-footer bg-gradient-secondary text-white">
      <div className="l-container">
        <Link href="/">
          <Image
            className="mt-[80px] h-auto w-full"
            src={footerItems.logo.url}
            alt={footerItems.title}
            width={footerItems.logo.width}
            height={footerItems.logo.height}
          />
        </Link>
        <div className="flex flex-col items-center justify-between py-[40px] text-sm sm:flex-row">
          <ul className="flex items-center gap-[24px]">
            {footerLinks.map(link => {
              return (
                <li key={link.label}>
                  <Link className="hover:underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-[20px] sm:mt-0">{footerItems.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
