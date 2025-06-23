const SectionHeader = ({ title, subtitle }) => {
  title = 'Do less admin.<br> Do more for your patients.';
  return (
    <div className="section-header pt-[64px]">
      <div className="l-container">
        <span className="text-[22px] font-normal text-[var(--med-gray)] opacity-[.9] sm:text-[24px]">
          {subtitle}
        </span>
        <h2
          className="mb-[60px] text-[40px] font-light sm:text-[66px]"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
      </div>
    </div>
  );
};

export default SectionHeader;
