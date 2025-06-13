import Card from '@/app/components/Card';
import clsx from 'clsx';

const CardGrid = ({ cards, layout, gap = 8 }) => {
  const presets = {
    /** 2 cols × 2 rows. Card 0 spans both rows in col 1. */
    'left-tall': {
      grid: `left-tall grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:gap-8`,
      item: i =>
        clsx(
          'lg:rounded-[16px] rounded-[8px] bg-white mb-8 lg:mb-0 overflow-hidden',
          i === 0
            ? 'row-span-2' // big tall card
            : 'col-start-2', // others in col 2
        ),
    },

    /** Simple 3-up, equal size */
    'three-up': {
      grid: `grid lg:grid-cols-3 gap-${gap}`,
      item: () =>
        'three-up lg:rounded-[16px] rounded-[8px] h-full flex-col flex text-sm bg-white overflow-hidden',
    },

    /** Quilted 2×2, Z-shape */
    quilt: {
      grid: `grid grid-cols-2 grid-rows-2 gap-${gap}`,
      item: i =>
        clsx(
          'lg:rounded-[16px] rounded-[8px] bg-white overflow-hidden',
          i === 1 && 'row-span-2', // second card tall
          i === 3 && 'col-start-1', // last card bottom-left
        ),
    },
  };

  const { grid, item } = presets[layout] || presets['three-up'];
  return (
    <div className="cardGrid mb-[40px]">
      <div className="l-container">
        <div className={clsx(grid)}>
          {cards.map((card, i) => {
            return (
              <Card
                key={i}
                className={item(i)}
                title={card.title}
                description={card.description}
                crumbs={card.crumbsCollection.items}
                image={card.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
