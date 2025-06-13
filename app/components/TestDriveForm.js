import clsx from 'clsx';
import Image from 'next/image';

const TestDriveForm = ({
  title,
  className,
  inputPlaceholder,
  buttonLabel,
  additionalText,
}) => {
  return (
    <div className={clsx('test-drive-form rounded-[10px] p-[20px]', className)}>
      <h4 className="text-sm">{title}</h4>
      <div className="relative my-[18px] flex items-center justify-center gap-8">
        <input
          className="max-h-[54px] w-full rounded-[10px] bg-white p-[20px]"
          type="text"
          placeholder={inputPlaceholder}
        />
        <button className="button-primary button--black absolute right-[20px] top-1/2 inline-flex -translate-y-1/2 items-center gap-2 text-sm">
          {buttonLabel}
          <Image
            width={10}
            height={11}
            src="/icons/arrow-right-up.svg"
            alt="right arrow up"
          />
        </button>
      </div>
      <span className="text-xs">{additionalText}</span>
    </div>
  );
};

export default TestDriveForm;
