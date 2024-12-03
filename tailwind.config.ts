import type { Config } from 'tailwindcss';
import { materialColors, materialTypography } from './material.color';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: materialColors,
      typography: materialTypography,
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
