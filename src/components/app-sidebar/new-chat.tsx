import { Button, Tooltip } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { SideBarMotionVariants } from '@/lib/motion-variants'
import useAppSidebar from './use-app-sidebar'

export default function NewChat() {
  const router = useRouter()
  const { isCollapsed, isSubPath } = useAppSidebar()

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!isSubPath && (
        <motion.div
          className="my-5 flex w-full flex-col items-center px-1"
          variants={SideBarMotionVariants}
          animate={SideBarMotionVariants.visible}
          initial={SideBarMotionVariants.hidden}
          key="new-chat"
          exit={SideBarMotionVariants.hidden}
        >
          {isCollapsed ? (
            <Tooltip
              key="new-chat"
              content="Start new chat"
              placement="right"
              portalContainer={document.body}
              closeDelay={0}
              offset={5}
            >
              <Button
                isIconOnly
                color="default"
                variant="shadow"
                className="size-9 min-w-0 border bg-white font-medium dark:border-default-200 dark:bg-default-100"
                radius="full"
              >
                <span className="iconify lucide--plus size-[22px]" />
              </Button>
            </Tooltip>
          ) : (
            <Button
              color="default"
              variant="shadow"
              className="w-full min-w-0 border bg-white font-medium dark:border-default-200 dark:bg-default-100"
              radius="full"
              onPress={() => {
                router.push('/')
              }}
            >
              Start new chat
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
