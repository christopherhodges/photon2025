'use client';

import CardGrid from '@/app/components/CardGrid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

export default function BlogFilterList({ initialPosts }) {
  // gather every unique category in alphabetical order
  const allCats = useMemo(() => {
    return Array.from(
      new Set(initialPosts.flatMap(p => p.categories || [])),
    ).sort();
  }, [initialPosts]);

  const [selected, setSelected] = useState([]); // what user clicked

  const toggleCat = cat => {
    setSelected(sel =>
      sel.includes(cat) ? sel.filter(c => c !== cat) : [...sel, cat],
    );
  };

  // OR-logic filter → show all when none selected
  const visiblePosts = useMemo(() => {
    if (selected.length === 0) return initialPosts;
    return initialPosts.filter(p =>
      (p.categories || []).some(c => selected.includes(c)),
    );
  }, [selected, initialPosts]);

  /* map posts ➜ Card props */
  const cards = visiblePosts.map(p => {
    return {
      title: p.title,
      key: p.sys.id,
      description: p.excerpt,
      categories: p.categories,
      imageTop: true,
      image: {
        url: p.coverImage.url,
        width: p.coverImage.width,
        height: p.coverImage.height,
        title: p.coverImage.title || p.title,
      },
      date: p.date,
      url: `/blog/${p.slug}`,
    };
  });

  return (
    <>
      <section className="l-container">
        <div className="pressura mb-[8px] mt-[40px] uppercase tracking-wide">
          Filter by:
        </div>

        <div className="mb-[40px] flex flex-wrap items-center gap-2 text-sm">
          {allCats.map(cat => {
            const active = selected.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={
                  'pressura group flex items-center gap-2 rounded-full bg-white px-3 py-1 uppercase transition hover:bg-white hover:text-black ' +
                  (active ? ' text-black' : ' text-[#707070]')
                }
              >
                <div
                  className={clsx(
                    'h-[7px] w-[7px] rounded-full border group-hover:border-black group-hover:bg-black',
                    active ? 'border-black bg-black' : 'border-[#707070]',
                  )}
                ></div>
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mb-[64px]">
        <CardGrid cards={cards} layout="three-up" />
      </div>
    </>
  );
}
