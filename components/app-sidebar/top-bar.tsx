'use client'

import { siteConfig } from '@/config/site'
import { Link } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'

import { Logo } from '@/components/icons'
import { SideBarMotionVariants } from '@/lib/motion-variants'
import useAppSidebar from './use-app-sidebar'

const getTitle = (pathname: string) => {
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

const TopBar: FC = memo(() => {
  const pathname = usePathname()
  const { isSubPath, isCollapsed } = useAppSidebar()

  const title = getTitle(pathname)

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {isSubPath ? (
        <motion.span
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          exit={SideBarMotionVariants.hidden}
          key="top-bar"
          className="h-8"
        >
          <Link
            href="/"
            color="foreground"
            className="group h-full flex-1 space-x-2 overflow-hidden px-2"
            title={title}
          >
            <span className="iconify lucide--chevron-left group-hover:-translate-x-0.5 size-[18px] text-default-400 transition-transform duration-150" />
            {!isCollapsed && (
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium text-foreground text-sm">
                {title}
              </span>
            )}
          </Link>
        </motion.span>
      ) : (
        <motion.span
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          exit={SideBarMotionVariants.hidden}
          key="logo"
          className="h-8"
        >
          <Link href="/" color="foreground">
            <Logo />
          </Link>
        </motion.span>
      )}
    </AnimatePresence>
  )
})

export default TopBar
