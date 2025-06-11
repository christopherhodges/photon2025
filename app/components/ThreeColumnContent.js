import CardGrid from '@/app/components/CardGrid';
import Crumb from '@/app/components/Crumb';

const ThreeColumnContent = ({ crumb, cards }) => {
  return (
    <div className="three-column-content">
      <div className="l-container">
        <div className="mb-[40px]">
          <Crumb label={crumb} borderStyles="border" />
        </div>
      </div>
      <CardGrid cards={cards} layout="three-up" gap={4} />
    </div>
  );
};

export default ThreeColumnContent;
