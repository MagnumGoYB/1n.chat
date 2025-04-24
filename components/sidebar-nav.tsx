'use client'

import { Listbox, ListboxItem } from '@heroui/listbox'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import { useCallback, useMemo } from 'react'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
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
            <Icon width={18} icon={item.icon} />
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
            <Icon width={18} icon={item.icon} />
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
          href={item.href}
          className={cn(
            'h-9 w-full p-0 text-default-500 outline-none transition-[color,background] duration-75 hover:bg-default-200/80 hover:text-foreground',
            (segment === item.key || item.href === pathname) &&
              'bg-default-200/80 text-foreground',
          )}
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
    [content, isCollapsed, segment, pathname],
  )

  return (
    <div
      className={cn('flex flex-col gap-0.5', {
        'px-1': isCollapsed,
        'mt-3': isSubPath,
      })}
    >
      <Listbox className="p-0" variant="flat" aria-label="Sidebar menu">
        {isSubPath && subItems.length > 0 ? (
          <>{subItems.map(listItem)}</>
        ) : (
          <>{items.map(listItem)}</>
        )}
      </Listbox>
    </div>
  )
}
