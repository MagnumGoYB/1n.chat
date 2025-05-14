'use client'

import { Link, cn } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useParams, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import type { Conversation as ConversationType } from '@/types/conversation'

import { useAppSidebar } from '@/components/app-sidebar'
import { SideBarMotionVariants } from '@/lib/motion-variants'

import ConversationItem from './item'

const MAX_LIMIT = 10

type ConversationProps = {
  recents?: ConversationType[]
  favorites?: ConversationType[]
}

export default function Conversation({
  recents = [],
  favorites = [],
}: ConversationProps) {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const segment = useSelectedLayoutSegment()
  const { isCollapsed, isSubPath } = useAppSidebar()

  const selectedId = segment === 'chat' ? params.id : undefined
  const slicedRecents = recents.slice(0, MAX_LIMIT)

  const select = (id: string) => {
    router.push(`/chat/${id}`)
  }

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!isSubPath && (
        <motion.div
          key="conversation"
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          exit={SideBarMotionVariants.hidden}
          className={cn('my-4 flex flex-col gap-y-4', isCollapsed && '!hidden')}
        >
          {favorites.length > 0 && (
            <div className="flex max-w-[165px] flex-col gap-y-2">
              <div className="flex items-center gap-1 px-3 font-medium text-default-400 text-tiny">
                <span className="iconify lucide--star size-3" />
                <span>Starred</span>
              </div>
              <ul className="flex flex-col space-y-px">
                {favorites.map((item) => (
                  <ConversationItem
                    key={`favorite-${item.id}`}
                    id={item.id}
                    title={item.title}
                    isFavorite={item.isFavorite}
                    isSelected={item.id === selectedId}
                    onSelect={() => select(item.id)}
                  />
                ))}
              </ul>
            </div>
          )}
          {recents.length > 0 && (
            <div className="flex max-w-[165px] flex-col gap-y-2">
              <span className="px-3 font-medium text-default-400 text-tiny">
                Recents
              </span>
              <ul className="flex flex-col space-y-px">
                {slicedRecents.map((recent) => (
                  <ConversationItem
                    key={`recent-${recent.id}`}
                    id={recent.id}
                    title={recent.title}
                    isFavorite={recent.isFavorite}
                    isSelected={recent.id === selectedId}
                    onSelect={() => select(recent.id)}
                  />
                ))}
              </ul>
              {recents.length > MAX_LIMIT && (
                <div className="mb-2 px-3">
                  <Link
                    color="foreground"
                    className="flex items-center gap-1 font-medium text-default-400 text-tiny"
                    href="/chats"
                  >
                    <span>View All</span>
                    <span className="iconify lucide--chevron-right size-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
