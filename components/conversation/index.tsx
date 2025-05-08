'use client'

import { Link, cn } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useParams, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { useAppSidebar } from '@/components/app-sidebar'
import { SideBarMotionVariants } from '@/lib/motion-variants'
import ConversationItem from './item'

const recents = [
  { id: '1', title: 'Conversation 1' },
  { id: '2', title: 'Conversation 2' },
  { id: '3', title: 'Conversation 3' },
  { id: '4', title: 'Conversation 4' },
  { id: '5', title: 'Conversation 5' },
  { id: '6', title: 'Conversation 6' },
  { id: '7', title: 'Conversation 7' },
  { id: '8', title: 'Conversation 8' },
  { id: '9', title: 'Conversation 9' },
  { id: '10', title: 'Conversation 10' },
  { id: '11', title: 'Conversation 11' },
  { id: '12', title: 'Conversation 12' },
]

const MAX_RECENTS_LIMIT = 10

export default function Conversation() {
  const router = useRouter()
  const params = useParams()
  const segment = useSelectedLayoutSegment()
  const { isCollapsed, isSubPath } = useAppSidebar()

  const selectedId = segment === 'chat' ? params.id?.[0] : undefined
  const slicedRecents = recents.slice(0, MAX_RECENTS_LIMIT)

  const select = (id: string) => {
    router.push(`/app/chat/${id}`)
  }

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!isSubPath && (
        <motion.div
          key="conversations"
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          exit={SideBarMotionVariants.hidden}
          className={cn('my-4 flex flex-col gap-y-4', isCollapsed && '!hidden')}
        >
          {recents && recents.length > 0 && (
            <div className="flex max-w-[165px] flex-col gap-y-2">
              <span className="px-3 font-medium text-default-400 text-tiny">
                Recents
              </span>
              <ul className="flex flex-col">
                {slicedRecents.map((recent) => (
                  <ConversationItem
                    key={recent.id}
                    id={recent.id}
                    title={recent.title}
                    isSelected={recent.id === selectedId}
                    onSelect={() => select(recent.id)}
                  />
                ))}
              </ul>
              {recents.length > MAX_RECENTS_LIMIT && (
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
