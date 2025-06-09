import clsx from 'clsx';

const PageTitle = ({ className, title }) => {
  return <h1 className={clsx(className)}>{title}</h1>;
};

export default PageTitle;
