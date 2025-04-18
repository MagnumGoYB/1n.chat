import { Button, Tooltip, cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import useAppSidebar from './use-app-sidebar'

type CollapseButtonProps = {
  className?: string
  onToggle: () => void
}

export default function CollapseButton({
  onToggle,
  className,
}: CollapseButtonProps) {
  const { isCollapsed } = useAppSidebar()

  if (isCollapsed) {
    return (
      <Tooltip
        key="expand-sidebar"
        content="Expand sidebar"
        placement="right"
        closeDelay={0}
        offset={5}
      >
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={onToggle}
          className={cn('size-8 min-w-0', className)}
        >
          <Icon icon="lucide:sidebar" width={18} className="text-default-400" />
          <span className="sr-only">Expand sidebar</span>
        </Button>
      </Tooltip>
    )
  }

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onPress={onToggle}
      className={cn('size-8 min-w-0', className)}
    >
      <Icon icon="lucide:sidebar" width={18} className="text-default-400" />
      <span className="sr-only">Collapse sidebar</span>
    </Button>
  )
}
