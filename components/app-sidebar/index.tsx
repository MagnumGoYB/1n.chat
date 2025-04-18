'use client'

import { ScrollShadow, Tooltip, cn } from '@heroui/react'
import { useDisclosure } from '@heroui/use-disclosure'
import { useIsMobile } from '@heroui/use-is-mobile'
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area'
import { useCallback, useState } from 'react'

import Wrapper from '@/components/app-sidebar/wrapper'

import type { ScrollShadowVisibility } from '@heroui/react'
import type { PropsWithChildren, ReactNode, UIEventHandler } from 'react'

import CollapseButton from './collapse-button'
import { Context } from './context'
import NewChat from './new-chat'
import useAppSidebar from './use-app-sidebar'

type AppSidebarProps = PropsWithChildren<{
  logo: ReactNode
  nav: ReactNode
  conversation?: ReactNode
  user?: ReactNode
  enableCollapse?: boolean
}>

export default function AppSidebar(props: AppSidebarProps) {
  const {
    logo,
    nav,
    conversation,
    user,
    enableCollapse = true,
    children,
  } = props

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof document === 'undefined' || document.cookie === undefined)
      return false
    if (!enableCollapse) return false
    return document.cookie.includes('sidebar-collapsed=true')
  })
  const [scrollShadowVisibility, setScrollShadowVisibility] =
    useState<ScrollShadowVisibility>()

  const isMobile = useIsMobile()
  const { isOpen, onOpenChange } = useDisclosure()

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => {
      document.cookie = `sidebar-collapsed=${!prev}; path=/`
      return !prev
    })
  }, [])

  const onScroll: UIEventHandler<HTMLDivElement> = useCallback((e) => {
    const isAtTop = e.currentTarget.scrollTop === 0
    const isAtBottom =
      e.currentTarget.scrollTop ===
      e.currentTarget.scrollHeight - e.currentTarget.clientHeight
    const isAtMiddle =
      e.currentTarget.scrollTop > 0 &&
      e.currentTarget.scrollTop <
        e.currentTarget.scrollHeight - e.currentTarget.clientHeight

    if (isAtTop) {
      setScrollShadowVisibility('bottom')
    } else if (isAtBottom) {
      setScrollShadowVisibility('top')
    } else if (isAtMiddle) {
      setScrollShadowVisibility('both')
    } else {
      setScrollShadowVisibility('auto')
    }
  }, [])

  return (
    <Context.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex h-dvh w-full">
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
              })}
            >
              {logo}
              {enableCollapse && !isCollapsed && (
                <CollapseButton
                  className="!-mr-1.5"
                  onToggle={isMobile ? onOpenChange : onToggle}
                />
              )}
            </div>
            <ScrollShadow
              className="flex h-full max-h-full w-full max-w-full"
              visibility={scrollShadowVisibility}
              hideScrollBar
            >
              <ScrollArea
                className={cn(
                  'relative h-full max-h-full w-full overflow-hidden pr-4',
                  { 'pr-1.5 ': isCollapsed },
                )}
                type="always"
              >
                <ScrollAreaViewport
                  className="h-full w-full rounded-[inherit]"
                  onScroll={onScroll}
                >
                  <NewChat />
                  {nav}
                  {conversation}
                </ScrollAreaViewport>
                <ScrollAreaScrollbar
                  className={cn(
                    'flex h-full w-2 touch-none select-none rounded border-l border-l-transparent p-[1px] transition-[colors,width]',
                    { 'w-1.5': isCollapsed },
                  )}
                  orientation="vertical"
                >
                  <ScrollAreaThumb className="relative flex-1 rounded-full bg-default-200/60 hover:bg-default-300/60" />
                </ScrollAreaScrollbar>
              </ScrollArea>
            </ScrollShadow>

            {!!user && (
              <div
                className={cn(
                  'flex w-full flex-col items-center justify-center gap-y-2 pr-4',
                  { 'pr-1.5': isCollapsed },
                )}
              >
                {user}
              </div>
            )}

            {enableCollapse && isCollapsed && (
              <Tooltip
                key="expand-sidebar"
                content="Expand sidebar"
                placement="right"
                closeDelay={0}
                offset={5}
              >
                <CollapseButton
                  className="-ml-1.5 absolute bottom-0 items-center justify-center"
                  onToggle={isMobile ? onOpenChange : onToggle}
                />
              </Tooltip>
            )}
          </div>
        </Wrapper>

        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </Context.Provider>
  )
}

export { useAppSidebar }
