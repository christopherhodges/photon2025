import ContentfulImage from '@/app/components/contentful-image';
import { pressura } from '@/lib/fonts';
import clsx from 'clsx';

const sizes = size =>
  ({
    sm: 'border px-[8px] py-[4px]',
  })[size] || 'border-2 px-[12px]  py-[8px]';

const Crumb = ({
  label,
  icon,
  borderStyles,
  size,
  textColor = 'text-black',
}) => {
  const sizeClasses = sizes(size);
  return (
    <span
      className={clsx(
        'crumb',
        textColor,
        pressura.className,
        borderStyles || 'border-[var(--light-gray)]',
        sizeClasses,
      )}
    >
      {!icon && <i></i>}

      {icon && (
        <ContentfulImage
          className="h-auto] w-[9px]"
          src={icon.url}
          width={icon.width}
          height={icon.height}
          alt={icon.title}
        />
      )}

      {label}
    </span>
  );
};

export default Crumb;
