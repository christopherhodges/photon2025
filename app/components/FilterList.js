import { formatDate } from '@/lib/formatDate';

const CategoryList = ({ categories, date }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3 text-[12px] md:text-[14px]">
      {categories.map(c => {
        return (
          <li
            key={c}
            className="pressura mb-1 rounded-full bg-[#E8EAF0] px-3 py-1 uppercase text-black"
          >
            {c}
          </li>
        );
      })}
      {date && (
        <div className="pressura mb-1 uppercase text-[var(--med-gray)]">
          {formatDate(date)}
        </div>
      )}
    </ul>
  );
};

export default CategoryList;
