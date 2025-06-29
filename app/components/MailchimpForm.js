'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Photon Health – Newsletter signup (Mailchimp)
 *
 * ⓘ  How it works
 * ─────────────────────────────────────────────────────────
 * • Submits directly to the generated Mailchimp “post” URL
 *   (no serverless route or API key needed).
 * • Uses HTML5 email validation; no jQuery Validate dependency.
 * • Shows a basic success / error banner based on the fetch result.
 *
 * Tailwind colours reference your design tokens; tweak freely.
 */
export default function MailchimpForm({
  className = '',
  inputPlaceholder = 'Enter your email address',
  mobilePlaceholder,
}) {
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [submitting, setSubmitting] = useState(false);

  const [placeholder, setPlaceholder] = useState(inputPlaceholder);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    setPlaceholder(isMobile ? mobilePlaceholder : inputPlaceholder);
  }, [inputPlaceholder, mobilePlaceholder]);

  // Mailchimp POST endpoint & hidden *honeypot* field name
  const MC_ENDPOINT =
    'https://health.us17.list-manage.com/subscribe/post?u=bae2c222f61f9ae32dd037b70&id=b522708f22&f_id=0023c2e1f0';
  const HONEYPOT = 'b_bae2c222f61f9ae32dd037b70_b522708f22';

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Bot trap – if the hidden input has a value, abort silently */
    if (data.get(HONEYPOT)) return;

    setSubmitting(true);
    setStatus(null);

    try {
      /* Convert to URLSearchParams so we can POST with fetch() */
      const params = new URLSearchParams(data);

      /* Mailchimp expects a browser-style form POST; fetch works */
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(MC_ENDPOINT, {
        method: 'POST',
        body: params,
        mode: 'no-cors', // skip CORS check; we assume success
      });

      // Because of `no-cors` the status is always 0; treat as success
      form.reset();
      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('test-drive-form rounded-[10px] p-[20px]', className)}
    >
      <h4 className="text-sm">Subscribe to our newsletter</h4>

      <div className="relative mt-[18px] flex items-center gap-8">
        <label className="w-full sm:flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="EMAIL"
            required
            placeholder={placeholder}
            className={clsx(
              'max-h-[54px] w-full rounded-[10px] bg-white p-[20px]',
            )}
          />
        </label>

        {/* Honeypot (bots only) */}
        <input
          type="text"
          name={HONEYPOT}
          className="hidden"
          tabIndex="-1"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            'button-primary button--black absolute right-[20px] top-1/2 inline-flex -translate-y-1/2 items-center gap-2 text-sm',
            status === 'loading' && 'cursor-not-allowed opacity-60',
          )}
        >
          {submitting ? '…' : 'Subscribe'}
          <Image
            width={10}
            height={11}
            src="/icons/arrow-right-up.svg"
            alt="right arrow up"
          />
        </button>
      </div>

      {/* Feedback banner */}
      {status === 'success' && (
        <p className="mt-2 rounded-lg bg-[var(--seafoam)] bg-opacity-90 px-3 py-1.5 text-xs">
          Thanks! Please check your inbox to confirm your subscription.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-2 rounded-lg bg-[#ED6B5B90] px-3 py-1.5 text-xs">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
