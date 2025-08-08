const CategoryList = ({ categories }) => {
  return (
    <ul className="flex flex-col flex-wrap items-start gap-2 sm:flex-row">
      {categories.map(c => {
        return (
          <li
            key={c}
            className="pressura rounded-full bg-[#E8EAF0] px-3 py-1 uppercase text-black"
          >
            {c}
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
