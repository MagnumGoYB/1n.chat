'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const client = new QueryClient()
  const router = useRouter()

  return (
    <QueryClientProvider client={client}>
      <HeroUIProvider navigate={router.push}>
        <ToastProvider toastProps={{ timeout: 1500 }} />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
