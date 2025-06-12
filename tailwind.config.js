import typography from '@tailwindcss/typography';

const tailwindCongig = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        /* translate half the strip → seamless loop */
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // move left by 50 %
        },
      },
      animation: {
        /* duration ≈ 20 s; change to taste */
        marquee: 'marquee 20s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-grotesk)'],
        sansBold: ['var(--font-grotesk-bold'],
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(var(--tw-gradient-angle, 180deg), #472ff7 0%, #ff5d52 50%, #b2dfe7 100%)',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
};

export default tailwindCongig;
