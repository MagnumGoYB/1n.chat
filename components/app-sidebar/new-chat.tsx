import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

import useAppSidebar from './use-app-sidebar'

export default function NewChat() {
  const { isCollapsed } = useAppSidebar()

  return (
    <div className="my-5 flex w-full flex-col items-center px-1">
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
            <Icon icon="lucide:plus" width={22} height={22} />
          </Button>
        </Tooltip>
      ) : (
        <Button
          color="default"
          variant="shadow"
          className="w-full min-w-0 border bg-white font-medium dark:border-default-200 dark:bg-default-100"
          radius="full"
        >
          Start new chat
        </Button>
      )}
    </div>
  )
}
