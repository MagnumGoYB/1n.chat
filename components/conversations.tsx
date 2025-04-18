'use client'

import { cn } from '@heroui/react'
import { useAppSidebar } from './app-sidebar'

export default function Conversations() {
  const { isCollapsed } = useAppSidebar()

  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-y-4',
        isCollapsed && 'max-w-12 overflow-hidden',
      )}
    >
      Conversations
    </div>
  )
}
