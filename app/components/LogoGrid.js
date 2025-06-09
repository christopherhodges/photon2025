import ContentfulImage from '@/app/components/contentful-image';
import Crumb from '@/app/components/Crumb';

const LogoGrid = ({ title, logos }) => {
  return (
    <div className="logoGrid bg-white py-[35px]">
      <div className="text-center">
        <Crumb label={title} />
      </div>
      {logos.length && (
        <div className="gap mt-[24px] flex items-center justify-center gap-[128px]">
          {logos?.map(logo => {
            return (
              <div key={logo.title}>
                <ContentfulImage
                  className="h-[28px] w-auto"
                  src={logo.url}
                  width={logo.width}
                  height={logo.height}
                  alt={logo.title}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LogoGrid;
