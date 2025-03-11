import '@/styles/globals.css'

import clsx from 'clsx'

import { inter, roboto_mono } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { Providers } from './providers'

import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const rootClass = clsx(
    'min-h-screen bg-background font-sans antialiased',
    inter.variable,
    roboto_mono.variable,
  )

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={rootClass}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
