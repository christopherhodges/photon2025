'use client';

import RichTextSectionHeader from '@/app/components/RichTextSectionHeader';
import { RichTextTestimonial } from '@/app/components/RichTextTestimonial';
import VideoPlayer from '@/app/components/VideoPlayer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

/**
 * Generic Contentful Rich-Text renderer.
 *
 * Props ──────────────────────────────────────────────
 * • document  – the `json` field from Contentful
 * • links     – the accompanying `links` object (for embeds)
 * • options   – optional overrides (same shape as rich-text-renderer)
 * • className – utility classes for the wrapper <div>
 */
export default function RichText({
  document,
  links,
  options = {},
  className = '',
}) {
  if (!document) return null;

  /** Build O(1) lookup maps for embedded entries & assets */
  const entryMap = new Map(
    [...(links?.entries?.block ?? []), ...(links?.entries?.inline ?? [])].map(
      entry => [entry.sys.id, entry],
    ),
  );

  /** Helper that turns an embedded-entry node into React */
  const renderEmbeddedEntry = node => {
    const entry = entryMap.get(node.data.target.sys.id);
    if (!entry) return null;

    // Handle testimonials (tolerate renamed typenames)
    const testimonialTypeNames = new Set(['Testimonial']);
    if (testimonialTypeNames.has(entry.__typename)) {
      return (
        <RichTextTestimonial
          testimonial={entry.testimonial.json}
          authorName={entry.name}
          authorImage={entry.image}
          authorTitle={entry.jobTitle}
          logo={entry.logo}
        />
      );
    }

    if (entry.__typename === 'Video') {
      return <VideoPlayer url={entry.videoUrl} />;
    }

    if (entry.__typename === 'ComponentSectionHeading') {
      return (
        <RichTextSectionHeader crumb={entry.crumbTitle} title={entry.title} />
      );
    }

    // Unknown embed → render nothing (or return a fallback component here)
    return null;
  };

  /** Base render behaviour shared across the site */
  const baseRenderOptions = {
    // Turn literal line-breaks into <br />
    renderText: text =>
      text
        .split('\n')
        .flatMap((seg, i) => (i === 0 ? seg : [<br key={i} />, seg])),

    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: renderEmbeddedEntry,
      [INLINES.EMBEDDED_ENTRY]: renderEmbeddedEntry,
    },
  };

  /** Deep-merge caller-supplied overrides */
  const mergedOptions = {
    ...baseRenderOptions,
    ...options,
    renderMark: {
      ...baseRenderOptions.renderMark,
      ...options.renderMark,
    },
    renderNode: {
      ...baseRenderOptions.renderNode,
      ...options.renderNode,
    },
    renderText: options.renderText ?? baseRenderOptions.renderText,
  };

  return (
    <div className={`richText ${className}`}>
      {documentToReactComponents(document, mergedOptions)}
    </div>
  );
}
