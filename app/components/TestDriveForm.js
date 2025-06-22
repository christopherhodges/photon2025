'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const ENDPOINT = process.env.NEXT_PUBLIC_DEMO_SMS_ENDPOINT;
const EVENTNAME = process.env.NEXT_PUBLIC_DEMO_EVENT;

const TestDriveForm = ({
  title,
  className,
  inputPlaceholder = 'Enter mobile number',
  mobilePlaceholder,
  buttonLabel = 'Text me the demo',
  additionalText,
}) => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Strip everything except digits, eg “(541) 602-9101” → “5416029101”
  const normalize = v => v.replace(/[^\d]/g, '');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!phone) return;

    try {
      setStatus('loading');

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: normalize(phone),
          eventName: EVENTNAME,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
      setPhone(''); // clear the field on success
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('test-drive-form rounded-[10px] p-[20px]', className)}
    >
      <h4 className="text-sm">{title}</h4>

      {status !== 'success' && (
        <div className="relative mt-[18px] flex items-center gap-8">
          <input
            className={clsx(
              'max-h-[54px] w-full rounded-[10px] bg-white p-[20px]',
              mobilePlaceholder ? 'hidden sm:inline-block' : '',
            )}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="tel"
            placeholder={inputPlaceholder}
            disabled={status === 'loading'}
          />

          {mobilePlaceholder && (
            <input
              className={clsx(
                'inline-block max-h-[54px] w-full rounded-[10px] bg-white p-[20px] sm:hidden',
              )}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
              placeholder={mobilePlaceholder}
              disabled={status === 'loading'}
            />
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !phone}
            className={clsx(
              'button-primary button--black absolute right-[20px] top-1/2 inline-flex -translate-y-1/2 items-center gap-2 text-sm',
              status === 'loading' && 'cursor-not-allowed opacity-60',
            )}
          >
            {status === 'loading' ? 'Sending…' : buttonLabel}
            <Image
              width={10}
              height={11}
              src="/icons/arrow-right-up.svg"
              alt="right arrow up"
            />
          </button>
        </div>
      )}

      {/* feedback */}
      {status === 'success' && (
        <p className="mt-2 rounded-lg bg-[var(--seafoam)] bg-opacity-90 px-3 py-1.5 text-xs">
          Demo text sent ✔︎ — check your phone!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 rounded-lg bg-[#ED6B5B90] px-3 py-1.5 text-xs">
          Something went wrong. Please try again.
        </p>
      )}

      {additionalText && (
        <span className="mt-[18px] inline-block text-xs">{additionalText}</span>
      )}
    </form>
  );
};

export default TestDriveForm;
