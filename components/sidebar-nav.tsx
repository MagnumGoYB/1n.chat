'use client'

import { Listbox, ListboxItem } from '@heroui/listbox'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/tooltip'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useMemo } from 'react'

import { SideBarMotionVariants } from '@/lib/motion-variants'
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation'
import { useAppSidebar } from './app-sidebar'

type SidebarNavItem = {
  key: string
  name: string
  href: string
  icon: string
  children?: SidebarNavItem[]
}

type SidebarNavProps = {
  items: SidebarNavItem[]
}

export default function SidebarNav({ items }: SidebarNavProps) {
  const segment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed, isSubPath, parentNavName } = useAppSidebar()

  const subItems = useMemo(
    () =>
      isSubPath
        ? (items
            .filter((it) => it.children?.length)
            .find((it) => it.name === parentNavName)?.children ?? [])
        : [],
    [isSubPath, items, parentNavName],
  )

  const content = useCallback(
    (item: SidebarNavItem) => {
      if (!isCollapsed) {
        return (
          <>
            <span className={cn('iconify size-[18px]', item.icon)} />
            <span className="truncate font-medium">{item.name}</span>
          </>
        )
      }
      return (
        <Tooltip
          key={item.key}
          content={item.name}
          placement="right"
          portalContainer={document.body}
          closeDelay={0}
          offset={5}
        >
          <div className="flex h-full w-full items-center justify-center">
            <span className={cn('iconify size-[18px]', item.icon)} />
          </div>
        </Tooltip>
      )
    },
    [isCollapsed],
  )

  const listItem = useCallback(
    (item: SidebarNavItem) => {
      return (
        <ListboxItem
          key={item.key}
          tabIndex={-1}
          className={cn(
            'h-9 w-full p-0 text-default-500 outline-none transition-[color,background] duration-75 hover:bg-default-200/80 hover:text-foreground',
            (segment === item.key || item.href === pathname) &&
              'bg-default-200/80 text-foreground',
          )}
          onFocus={(e) => e.stopPropagation()}
          onPress={() => {
            router.push(item.href)
          }}
          classNames={{
            title: cn('flex items-center gap-2.5 px-3', {
              'justify-center px-0 h-full': isCollapsed,
            }),
          }}
          textValue={item.name}
        >
          {content(item)}
        </ListboxItem>
      )
    },
    [content, isCollapsed, segment, pathname, router],
  )

  return (
    <div
      className={cn('flex flex-col gap-0.5', {
        'px-1': isCollapsed,
        'mt-3': isSubPath,
      })}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {isSubPath && subItems.length > 0 ? (
          <motion.div
            key="sub-nav"
            variants={SideBarMotionVariants}
            animate={SideBarMotionVariants.visible}
            initial={SideBarMotionVariants.hidden}
            exit={SideBarMotionVariants.hidden}
          >
            <Listbox
              className="p-0"
              variant="flat"
              aria-label={`Sidebar menu by ${parentNavName}`}
              selectionMode="none"
            >
              {subItems.map(listItem)}
            </Listbox>
          </motion.div>
        ) : (
          <motion.div
            key="main-nav"
            variants={SideBarMotionVariants}
            animate={SideBarMotionVariants.visible}
            initial={SideBarMotionVariants.hidden}
            exit={SideBarMotionVariants.hidden}
          >
            <Listbox
              className="p-0"
              variant="flat"
              aria-label="Sidebar menu"
              selectionMode="none"
            >
              {items.map(listItem)}
            </Listbox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
