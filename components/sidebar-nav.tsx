'use client'

import { Listbox, ListboxItem } from '@heroui/listbox'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import { useCallback } from 'react'

import { useAppSidebar } from './app-sidebar'

type SidebarNavItem = {
  key: string
  name: string
  href: string
  icon: string
}

type SidebarNavProps = {
  items: SidebarNavItem[]
}

export default function SidebarNav({ items }: SidebarNavProps) {
  const { isCollapsed } = useAppSidebar()

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

  return (
    <div className={cn('flex flex-col gap-0.5', { 'px-1': isCollapsed })}>
      <Listbox className="p-0" variant="flat" aria-label="Sidebar menu">
        {items.map((item) => {
          return (
            <ListboxItem
              key={item.key}
              href={item.href}
              className="h-9 w-full p-0 text-default-500 outline-none transition-[color,background] duration-75 hover:bg-default-200/80 hover:text-foreground"
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
        })}
      </Listbox>
    </div>
  )
}
