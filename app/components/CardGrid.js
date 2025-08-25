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
    'zig-zag': {
      /* two columns; let rows size to their own content */
      grid:
        `zigzag lg:grid lg:grid-cols-2 ` +
        `lg:[grid-auto-rows:auto] lg:gap-${gap}`,

      /* place each item explicitly */
      item: i =>
        clsx(
          'rounded-[16px] lg:rounded-[16px] mb-[20px] md:mb-0 bg-white overflow-hidden h-full',

          // 0 ─ tall, top-left
          i === 0 && 'lg:col-start-1 lg:row-start-1 lg:row-span-2',

          // 1 ─ small, top-right
          i === 1 && 'lg:col-start-2 lg:row-start-1',

          // 2 ─ small, bottom-left
          i === 2 && 'lg:col-start-1 lg:row-start-3',

          // 3 ─ tall, bottom-right
          i === 3 && 'lg:col-start-2 lg:row-start-2 lg:row-span-2',
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
              let maxImageHeight = 'none';
              if ((layout === 'left-tall' || layout === 'zig-zag') && i !== 0) {
                maxImageHeight = 'none';
              } else if (layout === 'three-up' && card.imageTop) {
                maxImageHeight = '290px';
              } else if (layout === 'two-up' && cards.length > 4) {
                maxImageHeight = '320px';
              }

              let imageFill = false;
              if (layout === 'left-tall' || layout === 'zig-zag') {
                imageFill = true;
              } else if (layout === 'three-up' && !card.imageTop) {
                imageFill = true;
                maxImageHeight = 'none';
              }
              const card_crumbs =
                card.crumbsCollection?.items ?? card.crumbs ?? [];
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
                    className={clsx(
                      (layout !== 'zig-zag' || layout !== 'left-tall') &&
                        'flex h-full flex-col justify-between',
                    )}
                    imageFill={imageFill}
                    key={card.key + '-card'} // stable key
                    title={card.title}
                    description={card.description}
                    crumbs={card_crumbs}
                    categories={card.categories ?? []}
                    image={card.image}
                    buttonText={card.buttonText}
                    buttonLink={card.buttonLink}
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
