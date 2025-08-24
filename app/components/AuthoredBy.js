import ContentfulImage from '@/app/components/contentful-image';
import { formatDate } from '@/lib/formatDate';

const AuthoredBy = ({ name, image, date }) => {
  return (
    <div className="flex items-center gap-3">
      {image && (
        <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
          <ContentfulImage
            className="h-full w-full object-cover"
            src={image.url}
            alt={image.title}
            width={image.width}
            height={image.height}
          />
        </div>
      )}
      <div className="flex flex-col leading-snug">
        <span className="font-bold text-[#121212]">{name}</span>
        <span className="text-[14px] text-[#707070]">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default AuthoredBy;
