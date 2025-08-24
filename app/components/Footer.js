// app/components/Footer.js
import Crumb from '@/app/components/Crumb';
import FooterNavigation from '@/app/components/FooterNavigation';
import MailchimpForm from '@/app/components/MailchimpForm';
import Image from 'next/image';
import Link from 'next/link';

const Footer = ({
  footer,
  showTestDriveSection = false,
  testDriveTitle = 'Close the loop on prescription care.',
}) => {
  // accept either shape: { footer: {...} } or just {...}
  const footerItems = footer?.footer ?? footer ?? null;
  const footerLinks = footerItems?.linksCollection?.items ?? [];

  if (!footerItems) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Footer: no footer data passed. Did you change getFooter()?',
      );
    }
    return null; // or render a skeleton
  }

  return (
    <footer className="l-footer bg-gradient-secondary relative pt-[40px] text-white">
      {showTestDriveSection && (
        <div className="l-container relative">
          <div className="mb-[40px] rounded-2xl bg-[var(--dark-blue)] py-[40px] text-center">
            <Crumb textColor="text-[var(--seafoam)]" label="Test Drive" />
            <h2 className="mb-[20px] text-[38px] font-light leading-[2]">
              {testDriveTitle}
            </h2>
            <a href="/sign-up" className="button-primary">
              Schedule a Demo
            </a>
          </div>
        </div>
      )}
      <div className="l-container relative z-10">
        <div className="bg-gradient-tertiary flex flex-wrap rounded-[16px] px-[24px] py-[40px] text-black">
          <div className="mb-4 w-full md:mb-0 md:w-1/3 md:max-w-[385px]">
            <h2 className="text-[38px] font-light">
              Subscribe to our&nbsp;newsletter
            </h2>
            <MailchimpForm
              className="mx-auto w-full text-white"
              inputPlaceholder="Enter email"
            />
          </div>

          <div className="w-full md:w-2/3 md:pl-10">
            <FooterNavigation footer={footerItems} />
          </div>
        </div>

        <Link href="/" className="block">
          <Image
            className="h-auto w-full sm:mt-[80px]"
            src={footerItems.logo?.url || '/images/footer-placeholder.png'}
            alt={footerItems.title || 'Photon Health'}
            width={footerItems.logo?.width || 1600}
            height={footerItems.logo?.height || 400}
          />
        </Link>

        <div className="flex flex-col items-center justify-between py-[40px] text-sm sm:flex-row">
          <ul className="flex items-center gap-[24px]">
            {footerLinks.map(link => (
              <li key={link.label}>
                <Link className="underline hover:no-underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-[20px] sm:mt-0">{footerItems.copyright}</p>
        </div>
      </div>

      <Image
        className="absolute bottom-0 left-1/2 z-0 h-auto w-full -translate-x-1/2"
        width="900"
        height="900"
        src="/images/footer-noise.png"
        alt=""
      />
    </footer>
  );
};

export default Footer;
