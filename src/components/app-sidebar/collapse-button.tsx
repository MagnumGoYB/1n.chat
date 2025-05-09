'use client'

import { Button, Tooltip, cn } from '@heroui/react'
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
  const tooltipContent = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'

  return (
    <Tooltip
      key="expand-sidebar"
      content={tooltipContent}
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
        <span className="iconify lucide--sidebar size-[18px] text-default-400" />
        <span className="sr-only">{tooltipContent}</span>
      </Button>
    </Tooltip>
  )
}
