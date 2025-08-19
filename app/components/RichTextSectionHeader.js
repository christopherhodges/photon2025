'use client';
import Crumb from '@/app/components/Crumb';
import { withBr } from '@/lib/withBr';

const SectionHeader = ({ crumb, title }) => {
  return (
    <div className="richText__sectionHeading relative">
      <div className="absolute -top-[5px] left-0 -translate-x-full pr-5 text-[22px] font-normal text-[var(--med-gray)] opacity-[.9] md:text-[24px]">
        <Crumb label={crumb} size="sm" />
      </div>

      <h2 className="mb-[40px] mt-[40px] text-[40px] font-light md:text-[66px]">
        {withBr(title)}
      </h2>
    </div>
  );
};

export default SectionHeader;
