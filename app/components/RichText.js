'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const baseRenderOptions = {
  /* inline / block renderers … */

  // NEW — treat "\n" as <br />
  renderText: text =>
    text
      .split('\n')
      .flatMap((segment, i) => (i === 0 ? segment : [<br key={i} />, segment])),
};

/**
 * @param {import('@contentful/rich-text-types').Document} document
 * @param {object} [options]   extra/override renderOptions
 * @param {string} [className] wrapper class
 */
export default function RichText({ document, options = {}, className = '' }) {
  if (!document) return null;

  // deep-merge the renderers you got via props with the base ones
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
