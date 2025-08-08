import CardGrid from '@/app/components/CardGrid';
import Crumb from '@/app/components/Crumb';
import clsx from 'clsx';

const ThreeColumnContent = ({ crumb, cards }) => {
  return (
    <div className={clsx(!crumb && 'pt-[40px]')}>
      <div className="l-container">
        {crumb && (
          <div className="mb-[40px]">
            <Crumb label={crumb} borderStyles="border" />
          </div>
        )}
      </div>
      <CardGrid cards={cards} layout="three-up" gap={4} />
    </div>
  );
};

export default ThreeColumnContent;
