import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { cn } from '@heroui/react'

import AppSidebar from '@/components/app-sidebar'
import Conversation from '@/components/conversation'
import SidebarNav from '@/components/sidebar-nav'
import { inter, roboto_mono } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { getCachedUser } from '@/lib/queries/user'

import { Providers } from './providers'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: { name: siteConfig.name, url: siteConfig.url },
  robots: { follow: false, index: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: 'device-width',
  height: 'device-height',
  viewportFit: 'contain',
  userScalable: false,
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const rootClass = cn(
    'min-h-screen bg-background font-sans antialiased',
    inter.variable,
    roboto_mono.variable,
  )

  const user = await getCachedUser()

  return (
    <html suppressHydrationWarning lang="en" translate="no">
      <head />
      <body className={rootClass}>
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: siteConfig.defaultTheme,
            enableSystem: true,
          }}
        >
          <AppSidebar
            nav={<SidebarNav />}
            conversation={<Conversation />}
            user={user}
          >
            {children}
          </AppSidebar>
        </Providers>
      </body>
    </html>
  )
}
