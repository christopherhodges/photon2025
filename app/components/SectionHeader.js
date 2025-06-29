'use client';
import { withBr } from '@/lib/withBr';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header pt-[64px]">
      <div className="l-container">
        <span className="text-[22px] font-normal text-[var(--med-gray)] opacity-[.9] md:text-[24px]">
          {subtitle}
        </span>
        <h2 className="mb-[40px] mt-[40px] text-[40px] font-light md:text-[66px]">
          {withBr(title)}
        </h2>
      </div>
    </div>
  );
};

export default SectionHeader;
