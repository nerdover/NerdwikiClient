import type { Config } from 'tailwindcss';
import { materialColors } from './material.color';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: materialColors,
    },
  },
  plugins: [],
} satisfies Config;
