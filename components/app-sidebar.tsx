'use client'

import { Button, ScrollShadow, Tooltip, cn } from '@heroui/react'
import { useDisclosure } from '@heroui/use-disclosure'
import { useIsMobile } from '@heroui/use-is-mobile'
import { Icon } from '@iconify/react'
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area'
import { useCallback, useState } from 'react'

import { Logo } from '@/components/icons'
import SidebarDrawer from '@/components/sidebar-drawer'
import SidebarMenu from '@/components/sidebar-menu'
import SidebarUser from '@/components/sidebar-user'
import { siteConfig } from '@/config/site'

import type { ScrollShadowVisibility } from '@heroui/react'
import type { PropsWithChildren, UIEventHandler } from 'react'
import SidebarChats from './sidebar-chats'

export default function AppSidebar({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof document === 'undefined' || document.cookie === undefined)
      return false
    return document.cookie.includes('sidebar-collapsed=true')
  })
  const [scrollShadowVisibility, setScrollShadowVisibility] =
    useState<ScrollShadowVisibility>()
  const { isOpen, onOpenChange } = useDisclosure()
  const isMobile = useIsMobile()

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => {
      // eslint-disable-next-line no-document-cookie
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
    <div className="flex h-dvh w-full">
      <SidebarDrawer
        className={cn(
          'flex flex-col overflow-hidden border-r bg-default-100 py-4 transition-[width] duration-200 ease-sidebar-collapse will-change-transform dark:border-default-100 dark:bg-background',
          { 'w-[200px]': !isCollapsed },
          { 'w-16': isCollapsed },
        )}
        hideCloseButton={true}
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
            <div>
              <Logo />
            </div>
            {!isCollapsed && (
              <CollapseButton
                isCollapsed={isCollapsed}
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
                { 'pr-1.5': isCollapsed },
              )}
              type="always"
            >
              <ScrollAreaViewport
                className="h-full w-full rounded-[inherit]"
                onScroll={onScroll}
              >
                <div className="my-5 flex w-full flex-col items-center gap-y-2 px-1">
                  {isCollapsed ? (
                    <Tooltip
                      key="new-chat"
                      content="Start new chat"
                      placement="right"
                      portalContainer={document.body}
                      closeDelay={0}
                      offset={5}
                    >
                      <Button
                        isIconOnly
                        color="default"
                        variant="shadow"
                        className="size-9 min-w-0 border bg-white font-medium dark:border-default-200 dark:bg-default-100"
                        radius="full"
                      >
                        <Icon icon="lucide:plus" width={22} height={22} />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      color="default"
                      variant="shadow"
                      className="w-full min-w-0 border bg-white font-medium dark:border-default-200 dark:bg-default-100"
                      radius="full"
                    >
                      Start new chat
                    </Button>
                  )}
                </div>
                <SidebarMenu isCollapsed={isCollapsed} items={siteConfig.nav} />
                <SidebarChats isCollapsed={isCollapsed} />
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
          <div
            className={cn(
              'flex w-full flex-col items-center justify-center gap-y-2 pr-4',
              { 'pr-1.5': isCollapsed },
            )}
          >
            <SidebarUser
              isCollapsed={isCollapsed}
              name="Admin"
              email="admin@example.com"
              avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </div>
          {isCollapsed && (
            <Tooltip
              key="expand-sidebar"
              content="Expand sidebar"
              placement="right"
              closeDelay={0}
              offset={5}
            >
              <CollapseButton
                isCollapsed={isCollapsed}
                className="-ml-1.5 absolute bottom-0 items-center justify-center"
                onToggle={isMobile ? onOpenChange : onToggle}
              />
            </Tooltip>
          )}
        </div>
      </SidebarDrawer>

      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  )
}

type CollapseButtonProps = {
  isCollapsed: boolean
  className?: string
  onToggle: () => void
}

function CollapseButton({
  isCollapsed,
  onToggle,
  className,
}: CollapseButtonProps) {
  if (isCollapsed) {
    return (
      <Tooltip
        key="expand-sidebar"
        content="Expand sidebar"
        placement="right"
        closeDelay={0}
        offset={5}
      >
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={onToggle}
          className={cn('size-8 min-w-0', className)}
        >
          <Icon icon="lucide:sidebar" width={18} className="text-default-400" />
          <span className="sr-only">Expand sidebar</span>
        </Button>
      </Tooltip>
    )
  }

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onPress={onToggle}
      className={cn('size-8 min-w-0', className)}
    >
      <Icon icon="lucide:sidebar" width={18} className="text-default-400" />
      <span className="sr-only">Collapse sidebar</span>
    </Button>
  )
}
