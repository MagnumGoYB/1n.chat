import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss/types/config'

export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      transitionTimingFunction: {
        'sidebar-collapse': 'cubic-bezier(.23,1,.32,1)',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
