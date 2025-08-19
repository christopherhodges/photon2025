'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js'; // ← core build works in v7
import 'video.js/dist/video-js.css';

import clsx from 'clsx'; // registers YouTube tech
import 'videojs-youtube';

/** Classify the URL so we know which tech to use */
function detectProvider(url) {
  if (/youtu\.be|youtube\.com/.test(url)) return 'youtube';
  if (/vimeo\.com/.test(url)) return 'vimeo';
  if (/\.m3u8($|\?)/.test(url)) return 'hls'; // HLS stream
  return 'html5';
}

export default function VideoPlayer({
  url,
  poster,
  autoplay = false,
  controls = true,
  loop = false,
  className = '',
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!url || !videoRef.current) return;

    // Dispose the previous player if props change
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const provider = detectProvider(url);

    const options = {
      autoplay,
      controls,
      loop,
      poster,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: url,
          type:
            provider === 'youtube'
              ? 'video/youtube'
              : provider === 'hls'
                ? 'application/x-mpegURL'
                : undefined, // Let browser sniff MP4 / WebM
        },
      ],
      techOrder: ['youtube', 'html5'],
    };

    playerRef.current = videojs(videoRef.current, options);

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [url, poster, autoplay, controls, loop]);

  return (
    <div data-vjs-player className={clsx(className, 'richText__video')}>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
      />
    </div>
  );
}
