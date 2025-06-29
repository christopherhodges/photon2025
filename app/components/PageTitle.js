import { withBr } from '@/lib/withBr';
import clsx from 'clsx';

const PageTitle = ({ className, title }) => {
  return <h1 className={clsx(className)}>{withBr(title)}</h1>;
};

export default PageTitle;
