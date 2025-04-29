'use client'

import { cn } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'

import { SideBarMotionVariants } from '@/lib/motion-variants'
import { useAppSidebar } from './app-sidebar'

export default function Conversations() {
  const { isCollapsed, isSubPath } = useAppSidebar()

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!isSubPath && (
        <motion.div
          key="conversations"
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          exit={SideBarMotionVariants.hidden}
          className={cn(
            'mt-4 flex flex-col gap-y-4',
            isCollapsed && 'max-w-12 overflow-hidden',
          )}
        >
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
          Conversations
          <br />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
