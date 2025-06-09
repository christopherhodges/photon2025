import clsx from 'clsx';

const TestDriveForm = ({
  title,
  className,
  inputPlaceholder,
  buttonLabel,
  additionalText,
}) => {
  return (
    <div
      className={clsx(
        'test-drive-form mb-[106px] rounded-[10px] border border-white/40 bg-white/20 p-[20px] backdrop-blur-[104px]',
        className,
      )}
    >
      <h4 className="text-sm">{title}</h4>
      <div className="relative my-[24px] flex items-center justify-center gap-8">
        <input
          className="max-h-[54px] w-full rounded-[10px] bg-white p-[20px]"
          type="text"
          placeholder={inputPlaceholder}
        />
        <button className="button-tertiary absolute right-[20px] top-1/2 -translate-y-1/2 text-sm">
          {buttonLabel}
        </button>
      </div>
      <span className="text-xs">{additionalText}</span>
    </div>
  );
};

export default TestDriveForm;
