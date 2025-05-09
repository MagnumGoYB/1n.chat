'use client'

import type { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@heroui/react'
import { useDisclosure } from '@heroui/use-disclosure'
import { useIsMobile } from '@heroui/use-is-mobile'
import { useCallback, useLayoutEffect, useState } from 'react'

import CurrentUser from '@/components/current-user'
import ScrollArea from '@/components/scroll-area'

import { useUserGuard } from '../user-guard-provider'
import CollapseButton from './collapse-button'
import { Context } from './context'
import NewChat from './new-chat'
import TopBar from './top-bar'
import useAppSidebar from './use-app-sidebar'
import useIsSubPath from './use-is-sub-path'
import Wrapper from './wrapper'

type AppSidebarProps = PropsWithChildren<{
  nav: ReactNode
  conversation?: ReactNode
  enableCollapse?: boolean
}>

export default function AppSidebar(props: AppSidebarProps) {
  const { nav, conversation, enableCollapse = true, children } = props

  const [isCollapsed, setIsCollapsed] = useState(false)

  const { user } = useUserGuard()
  const isMobile = useIsMobile()
  const { isOpen, onOpenChange } = useDisclosure()
  const [isSubPath, parentNavName] = useIsSubPath()

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => {
      document.cookie = `sidebar-collapsed=${!prev}; path=/`
      return !prev
    })
  }, [])

  useLayoutEffect(() => {
    if (enableCollapse) {
      setIsCollapsed(document.cookie.includes('sidebar-collapsed=true'))
    }
  }, [enableCollapse])

  return (
    <Context.Provider
      value={{ isCollapsed, setIsCollapsed, isSubPath, parentNavName }}
    >
      <div className="flex h-dvh w-full">
        {user && (
          <Wrapper
            className={cn(
              'flex-col overflow-hidden border-r bg-default-100 py-4 transition-[width] duration-200 ease-sidebar-collapse will-change-transform dark:border-default-100 dark:bg-background',
              { 'w-[200px]': !isCollapsed },
              { 'w-16': isCollapsed },
            )}
            hideCloseButton={!isMobile}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <div
              className={cn('relative flex h-full w-full flex-col pl-4', {
                'items-center pb-9 pl-1.5': isCollapsed,
              })}
            >
              <div
                className={cn('flex w-full items-center justify-between pr-4', {
                  'justify-center pr-1.5': isCollapsed,
                  'items-start': isSubPath,
                })}
              >
                <TopBar />
                {enableCollapse && !isCollapsed && (
                  <CollapseButton
                    className="!-mr-1.5"
                    onToggle={isMobile ? onOpenChange : onToggle}
                  />
                )}
              </div>
              <ScrollArea defaultShadowVisibility="bottom">
                <NewChat />
                {nav}
                {conversation}
              </ScrollArea>
              <div
                className={cn(
                  'flex w-full flex-col items-center justify-center gap-y-2 pr-4',
                  { 'pr-1.5': isCollapsed },
                )}
              >
                <CurrentUser {...user} />
              </div>
              {enableCollapse && isCollapsed && (
                <CollapseButton
                  className="-ml-1.5 absolute bottom-0 items-center justify-center"
                  onToggle={isMobile ? onOpenChange : onToggle}
                />
              )}
            </div>
          </Wrapper>
        )}
        <div className="relative flex h-dvh w-full flex-1 flex-col overflow-auto">
          {children}
        </div>
      </div>
    </Context.Provider>
  )
}

export { useAppSidebar }
