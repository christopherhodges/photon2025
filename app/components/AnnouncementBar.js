import { pressura } from '@/lib/fonts';
import clsx from 'clsx';

const AnnouncementBar = ({ content }) => {
  return (
    <a
      href="#"
      className={clsx(
        'announcement-bar absolute left-0 top-0 z-[1000] flex w-full items-center justify-center gap-4 bg-black py-[11px] text-sm uppercase text-white',
        pressura.className,
      )}
    >
      {content}
      <span className="text-[var(--seafoam)]">
        Read More <i>→</i>
      </span>
    </a>
  );
};

export default AnnouncementBar;
