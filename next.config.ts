// cSpell:disable

import type { NextConfig } from 'next'

export default {
  env: {},
  output: 'standalone',
  productionBrowserSourceMaps: false,
  devIndicators: {
    position: 'top-right',
  },
} satisfies NextConfig
