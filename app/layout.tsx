import '@/styles/globals.css'

import { inter, roboto_mono } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { cn } from '@heroui/react'
import { Providers } from './providers'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import AppSidebar from '@/components/app-sidebar'
import Conversations from '@/components/conversations'
import CurrentUser from '@/components/current-user'
import SidebarNav from '@/components/sidebar-nav'

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
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const rootClass = cn(
    'min-h-screen bg-background font-sans antialiased',
    inter.variable,
    roboto_mono.variable,
  )

  return (
    <html suppressHydrationWarning lang="en">
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
            nav={<SidebarNav items={siteConfig.nav} />}
            conversation={<Conversations />}
            user={
              <CurrentUser
                name="Admin"
                email="admin@example.com"
                avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            }
          >
            {children}
          </AppSidebar>
        </Providers>
      </body>
    </html>
  )
}
