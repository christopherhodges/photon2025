'use client';

import Image from 'next/image';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props) {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
}
