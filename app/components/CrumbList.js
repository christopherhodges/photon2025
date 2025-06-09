import Crumb from '@/app/components/Crumb';

const CrumbList = ({ crumbs }) => {
  return (
    <div className="flex gap-2">
      {crumbs.map((crumb, i) => {
        return (
          <Crumb
            size="sm"
            key={crumb.crumbTitle}
            icon={crumb.crumbIcon}
            label={crumb.crumbTitle}
            borderStyles={
              crumb.crumbIcon || i !== 0
                ? 'border border-transparent'
                : 'border border-black'
            }
          />
        );
      })}
    </div>
  );
};

export default CrumbList;
