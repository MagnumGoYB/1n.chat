'use client'

import { siteConfig } from '@/config/site'
import { Link } from '@heroui/react'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

const TopBar: FC = () => {
  const pathname = usePathname()

  const title = () => {
    let value = ''
    for (const item of siteConfig.nav) {
      if (item.href === pathname) {
        value = item.name
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.href === pathname) {
            value = item.name
          }
        }
      }
    }
    return value
  }

  return (
    <Link
      href="/"
      color="foreground"
      className="h-8 flex-1 space-x-2 overflow-hidden px-2"
      title={title()}
    >
      <span className="iconify lucide--chevron-left size-[18px] text-default-400" />
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium text-foreground text-sm">
        {title()}
      </span>
    </Link>
  )
}

export default TopBar
