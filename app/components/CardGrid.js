'use client';
import Card from '@/app/components/Card';
import { shuffleString } from '@/lib/utils/shuffleString';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const CardGrid = ({ cards, layout, gap = 8 }) => {
  const presets = {
    /** 2 cols × 2 rows. Card 0 spans both rows in col 1. */
    'left-tall': {
      grid: `left-tall lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:[grid-template-rows:1fr_1fr] lg:gap-8`,
      item: i =>
        clsx(
          'lg:rounded-[16px] rounded-[16px] bg-white mb-8 lg:mb-0 overflow-hidden h-full',
          i === 0
            ? 'row-span-2' // big tall card
            : 'col-start-2', // others in col 2
        ),
    },

    /** 2 columns, equal size */
    'two-up': {
      grid: `grid lg:grid-cols-2 gap-${gap}`,
      item: () =>
        'lg:rounded-[16px] rounded-[16px] h-full flex flex-col text-sm bg-white overflow-hidden',
    },

    /** Simple 3-up, equal size */
    'three-up': {
      grid: `grid lg:grid-cols-3 gap-${gap}`,
      item: () =>
        'three-up lg:rounded-[16px] rounded-[16px] h-full flex-col flex text-sm bg-white overflow-hidden',
    },

    /** Quilted 2×2, Z-shape */
    quilt: {
      grid: `grid grid-cols-2 grid-rows-2 gap-${gap}`,
      item: i =>
        clsx(
          'lg:rounded-[16px] rounded-[16px] bg-white overflow-hidden',
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
          <AnimatePresence
            key={shuffleString('lskdjflskdjfsldkfj')}
            mode="popLayout"
          >
            {cards.map((card, i) => {
              let maxImageHeight;
              if (layout === 'left-tall' && i !== 0) {
                maxImageHeight = i === 'none'; // tall left vs right cards
              } else if (layout === 'three-up') {
                maxImageHeight = '250px';
              } else if (layout === 'two-up' && cards.length > 4) {
                maxImageHeight = '320px';
              } else {
                maxImageHeight = 'none'; // no max
              }
              return (
                <motion.div
                  key={shuffleString('asdflkjwoeifj') + '-animate'} // stable key
                  layout // smooth re-flow
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={item(i)}
                >
                  <Card
                    imageFill={layout === 'left-tall' || !card.imageTop}
                    key={card.key + '-card'} // stable key
                    title={card.title}
                    description={card.description}
                    crumbs={card.crumbs ?? []}
                    categories={card.categories ?? []}
                    image={card.image}
                    date={card.date}
                    isCaseStudy={card.isCaseStudy ?? false}
                    imageTop={card.imageTop}
                    maxImageHeight={maxImageHeight}
                    url={card.url}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
