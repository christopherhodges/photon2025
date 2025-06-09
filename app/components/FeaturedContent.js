import ContentSlider from '@/app/components/ContentSlider';
import Crumb from '@/app/components/Crumb';
import Link from 'next/link';

const FeaturedContent = ({
  crumb,
  sectionTitle,
  buttonLabel,
  buttonLink,
  items,
}) => {
  return (
    <div className="featuredContent bg-[var(--dark-blue)] py-[60px]">
      <div className="l-container">
        <header className="flex flex-col items-center justify-center gap-[24px] text-center">
          <Crumb
            textColor="text-white"
            borderStyles="border border-white/25"
            label={crumb}
          />
          <h2 className="text-[38px] text-white">{sectionTitle}</h2>
          <Link
            className="button-primary button--white text-sm"
            href={buttonLink}
          >
            {buttonLabel}
          </Link>
        </header>
        <ContentSlider items={items} />
      </div>
    </div>
  );
};

export default FeaturedContent;
