'use client'

import { createContext, useCallback, useMemo, useState } from 'react'

import type { PropsWithChildren } from 'react'

type AppSidebarContext = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export const AppSidebarContext = createContext<AppSidebarContext | null>(null)

const PromptContainerProvider = ({ children }: PropsWithChildren) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.cookie.includes('sidebar-collapsed=true')
  })

  const _setIsCollapsed = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const state = typeof value === 'function' ? value(isCollapsed) : value
      setIsCollapsed(state)
    },
    [isCollapsed],
  )

  const contextValue = useMemo<AppSidebarContext>(
    () => ({ isCollapsed, setIsCollapsed: _setIsCollapsed }),
    [isCollapsed, _setIsCollapsed],
  )

  return (
    <AppSidebarContext.Provider value={contextValue}>
      {children}
    </AppSidebarContext.Provider>
  )
}

export default PromptContainerProvider
