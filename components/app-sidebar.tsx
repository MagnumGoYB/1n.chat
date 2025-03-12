'use client'

import { Button, ScrollShadow, cn } from '@heroui/react'
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

import SidebarDrawer from '@/components/sidebar-drawer'

import type { ScrollShadowVisibility } from '@heroui/react'
import type { PropsWithChildren } from 'react'

export default function AppSidebar({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [scrollShadowVisibility, setScrollShadowVisibility] =
    useState<ScrollShadowVisibility>()
  const { isOpen, onOpenChange } = useDisclosure()
  const isMobile = useIsMobile()

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev)
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
            'items-center pb-8 pl-1.5': isCollapsed,
          })}
        >
          <div
            className={cn('flex w-full items-center justify-between pr-4', {
              'justify-center pr-1.5': isCollapsed,
            })}
          >
            <div>1</div>
            {!isCollapsed && (
              <CollapseButton
                className="!-mr-1.5"
                srOnly="Collapse sidebar"
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
            >
              <ScrollAreaViewport
                className="h-full w-full rounded-[inherit]"
                onScroll={(e) => {
                  const isAtTop = e.currentTarget.scrollTop === 0
                  const isAtBottom =
                    e.currentTarget.scrollTop ===
                    e.currentTarget.scrollHeight - e.currentTarget.clientHeight
                  const isAtMiddle =
                    e.currentTarget.scrollTop > 0 &&
                    e.currentTarget.scrollTop <
                      e.currentTarget.scrollHeight -
                        e.currentTarget.clientHeight

                  if (isAtTop) {
                    setScrollShadowVisibility('bottom')
                  } else if (isAtBottom) {
                    setScrollShadowVisibility('top')
                  } else if (isAtMiddle) {
                    setScrollShadowVisibility('both')
                  } else {
                    setScrollShadowVisibility('auto')
                  }
                }}
              >
                <div className="gap-10">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Placeat eum illum atque sint beatae quibusdam exercitationem
                    similique, molestias eligendi esse. Laborum voluptatum neque
                    molestias ipsa laudantium! Adipisci nisi sint perspiciatis.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sed impedit, alias libero incidunt delectus aspernatur
                    necessitatibus ut repellat exercitationem. Consequuntur
                    quisquam officia nulla doloremque recusandae error nisi
                    quidem, sunt sint.
                  </p>
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar
                className={cn(
                  'flex h-full w-2.5 touch-none select-none rounded border-l border-l-transparent p-[1px] transition-[colors,width]',
                  { 'w-1.5': isCollapsed },
                )}
                orientation="vertical"
              >
                <ScrollAreaThumb className="relative flex-1 rounded-full bg-default-300" />
              </ScrollAreaScrollbar>
            </ScrollArea>
          </ScrollShadow>
          {isCollapsed && (
            <CollapseButton
              className="absolute bottom-0"
              srOnly="Expand sidebar"
              onToggle={isMobile ? onOpenChange : onToggle}
            />
          )}
        </div>
      </SidebarDrawer>

      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  )
}

type CollapseButtonProps = {
  className?: string
  srOnly?: string
  onToggle: () => void
}

function CollapseButton({ srOnly, onToggle, className }: CollapseButtonProps) {
  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onPress={onToggle}
      className={cn('size-8 min-w-0', className)}
    >
      <Icon icon="lucide:sidebar" width={18} className="text-default-400" />
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </Button>
  )
}
