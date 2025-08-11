/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
  safelist: ['pl-4', 'pl-8', 'pl-12', 'pl-16', 'pl-20', 'pl-24'],
};
