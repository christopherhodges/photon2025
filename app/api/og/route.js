// app/api/og/route.js
import { SITE_NAME } from '@/lib/constants';
import { ImageResponse } from 'next/og';

// Run on the Vercel Edge so it’s fast & cached
export const runtime = 'edge';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || SITE_NAME;

  return new ImageResponse(
    (
      /* Your OG card layout – use any React/JSX */
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 80,
          fontWeight: 700,
          background: '#fff',
          color: '#000',
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630, // standard OG size
    },
  );
}
