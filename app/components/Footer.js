import TestDriveForm from '@/app/components/TestDriveForm';
import Image from 'next/image';
import Link from 'next/link';

const Footer = footer => {
  const footerItems = footer.footer;
  const footerLinks = footerItems.linksCollection.items;
  return (
    <footer className="l-footer bg-gradient-secondary text-white">
      <div className="l-container">
        <div className="py-[40px]">
          <TestDriveForm
            className="mx-auto w-full max-w-[670px] text-white"
            title="Subscribe to our newsletter"
            inputPlaceholder="Enter your email address"
            buttonLabel="Try it out"
            additionalText="This is just a test script. Not real, not fillable, and definitely not reaching a pharmacy near you."
          />
        </div>

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
                  <Link
                    className="underline hover:no-underline"
                    href={link.href}
                  >
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
