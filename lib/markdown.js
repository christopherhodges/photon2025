import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

function RichTextAsset({ id, assets }) {
  const asset = assets?.find(asset => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}

export function Markdown({ content }) {
  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });
}
