'use client';
import ContentfulImage from '@/app/components/contentful-image';
import CrumbList from '@/app/components/CrumbList';
import { withBr } from '@/lib/withBr';
import clsx from 'clsx';

const Card = ({ className, crumbs, title, description, image }) => {
  return (
    <div className={clsx(className, 'card bg-white')}>
      <div className="p-[24px]">
        <CrumbList crumbs={crumbs} />
        <h3 className="mt-[40px] text-[24px] font-normal">{withBr(title)}</h3>
        <p className="mt-[10px] opacity-[.8]">{description}</p>
      </div>
      <ContentfulImage
        className="mt-auto w-full sm:min-h-[250px] sm:object-cover"
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.title}
      />
    </div>
  );
};

export default Card;
