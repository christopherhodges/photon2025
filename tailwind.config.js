import typography from '@tailwindcss/typography';

const tailwindCongig = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-grotesk)'],
        sansBold: ['var(--font-grotesk-bold'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
};

export default tailwindCongig;
