import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { cn } from '@heroui/react'

import AppSidebar from '@/components/app-sidebar'
import Conversation from '@/components/conversation'
import SidebarNav from '@/components/sidebar-nav'
import { UserGuardProvider } from '@/components/user-guard-provider'
import { inter, roboto_mono } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { getConversations } from '@/lib/queries/conversation'
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
  const initialUser = await getCachedUser()
  const initialConversations = await getConversations()

  const initialRecents = initialConversations.filter(
    (conversation) => !conversation.isFavorite,
  )
  const initialFavorites = initialConversations.filter(
    (conversation) => conversation.isFavorite,
  )

  return (
    <html suppressHydrationWarning lang="en" translate="no">
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          roboto_mono.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: siteConfig.defaultTheme,
            enableSystem: true,
          }}
        >
          <UserGuardProvider initialUser={initialUser}>
            <AppSidebar
              nav={<SidebarNav />}
              conversation={
                <Conversation
                  recents={initialRecents}
                  favorites={initialFavorites}
                />
              }
            >
              {children}
            </AppSidebar>
          </UserGuardProvider>
        </Providers>
      </body>
    </html>
  )
}
