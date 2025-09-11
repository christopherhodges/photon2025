'use client';

import Image from 'next/image';

export default function ContentfulImage(props) {
  // const shimmer = (w, h) =>
  //   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 692" preserveAspectRatio="xMidYMid" width="${w}" height="${h}" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);"><g style="transform: matrix(-1, 0, 0, 1, 3000, 0);" data-idx="1"><linearGradient y2="-0.5499144196510315" x2="1.1" y1="0" x1="-0.1" id="ldbk-nq4q5u6dq7r" data-idx="2"> <stop offset="0.00" stop-color="#b5d7e5" data-idx="4"></stop><stop offset="0.50" stop-color="#e86651 684dd9" data-idx="5"></stop><stop offset="1.00" stop-color="#684dd9" data-idx="6"></stop> </linearGradient> </g></g></svg>`;

  const shimmer = (
    w,
    h,
  ) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  
  <defs>
          <linearGradient
            id="bg"
            x1="-1"
            y1="0.5"
            x2="2"
            y2="0.5"
            gradientUnits="objectBoundingBox"
            gradientTransform="rotate(-5 0.5 0.5)"
          >
            <stop offset="0%" stop-color="#684dd9" />

            <stop offset="40%" stop-color="#e86651" />

            <animate
              attributeName="x1"
              values="-1; 2; -1"
              keyTimes=".1; .6; 1"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="2; 5; 2"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines=".25 .1 .25 1; .25 .1 .25 1"
            />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#bg)" />

</svg>`;

  const toBase64 = str =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <Image
      alt={props.title}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...props}
    />
  );
}
