import clsx from 'clsx';

const PageTitle = ({ className, title }) => {
  return <h1 className={clsx(className, 'text-[48px]')}>{title}</h1>;
};

export default PageTitle;
