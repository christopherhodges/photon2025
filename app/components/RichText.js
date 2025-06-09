/* components/RichText.js */
'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';

// Tailwind helpers (tweak to taste)
const headingClass = 'mt-8 mb-4 font-bold text-gray-900';
const paragraphClass = 'mb-4 leading-relaxed';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: text => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
    [MARKS.CODE]: text => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
        {text}
      </code>
    ),
  },

  renderNode: {
    // headings
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className={`text-2xl ${headingClass}`}>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className={`text-xl ${headingClass}`}>{children}</h3>
    ),

    // paragraphs
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className={paragraphClass}>{children}</p>
    ),

    // links
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),

    // embedded asset (image)
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const file = node.data.target.fields.file;
      const title = node.data.target.fields.title || '';
      return (
        <Image
          src={file.url}
          width={file.width}
          height={file.height}
          alt={title}
          className="my-8 rounded-lg"
        />
      );
    },
  },
};

export default function RichText({ document }) {
  if (!document) return null;
  return <>{documentToReactComponents(document, renderOptions)}</>;
}
