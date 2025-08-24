'use client';

import ContentfulImage from '@/app/components/contentful-image';
import RichTextSectionHeader from '@/app/components/RichTextSectionHeader';
import { RichTextTestimonial } from '@/app/components/RichTextTestimonial';
import VideoPlayer from '@/app/components/VideoPlayer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function RichText({
  document,
  links,
  options = {},
  className = '',
}) {
  if (!document) return null;

  /* ────────────────────────────
     Fast lookup tables
  ──────────────────────────── */
  const entryMap = new Map(
    [...(links?.entries?.block ?? []), ...(links?.entries?.inline ?? [])].map(
      e => [e.sys.id, e],
    ),
  );

  const assetMap = new Map(
    [...(links?.assets?.block ?? [])].map(a => [a.sys.id, a]),
  );

  /* ────────────────────────────
     Entries → React
  ──────────────────────────── */
  const renderEmbeddedEntry = node => {
    const entry = entryMap.get(node.data.target.sys.id);
    if (!entry) return null;

    if (entry.__typename === 'Testimonial') {
      console.log(entry);
      return (
        <RichTextTestimonial
          showAuthor={entry.showName === null ? true : entry.showName}
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

    return null; // unknown entry type
  };

  /* ────────────────────────────
     Assets → React
  ──────────────────────────── */
  const renderEmbeddedAsset = node => {
    const asset = assetMap.get(node.data.target.sys.id);
    if (!asset) return null;

    const { url, width, height, description, title, contentType } = asset;

    /* ── Video files ─────────────────────────────── */
    if (/^video\//.test(contentType ?? '')) {
      return <VideoPlayer url={url} />;
    }

    /* ── Images (early-exit if it’s not an image) ── */
    if (!/^image\//.test(contentType ?? '')) return null;

    return (
      <div className="richText__image overflow-hidden rounded-2xl">
        <ContentfulImage
          src={url}
          width={width}
          height={height}
          alt={description || title || ''}
          className="mx-auto my-8"
        />
      </div>
    );
  };

  /* ────────────────────────────
     Base render options
  ──────────────────────────── */
  const baseRenderOptions = {
    renderText: text =>
      text.split('\n').flatMap((s, i) => (i === 0 ? s : [<br key={i} />, s])),

    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: renderEmbeddedEntry,
      [INLINES.EMBEDDED_ENTRY]: renderEmbeddedEntry,
      [BLOCKS.EMBEDDED_ASSET]: renderEmbeddedAsset, // assets are block-only
    },
  };

  /* ────────────────────────────
     Merge caller overrides & render
  ──────────────────────────── */
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
