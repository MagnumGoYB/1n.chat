import type { Key } from 'react'

import { Button, cn } from '@heroui/react'
import { useRouter } from 'next/navigation'
import Actions from './actions'

interface ConversationItemProps {
  id: string
  title: string
  isSelected?: boolean
  isFavorite?: boolean
  onSelect?: () => void
}

export default function ConversationItem({
  id,
  title,
  onSelect,
  isSelected,
  isFavorite,
}: ConversationItemProps) {
  const router = useRouter()

  const handleActions = (key: Key) => {
    console.log(`Actions clicked: ${key} on conversation ${id}`)
  }

  return (
    <li className="relative w-full">
      <Button
        disableRipple
        variant="light"
        radius="sm"
        className={cn(
          'peer flex h-9 w-full min-w-0 justify-start gap-2.5 rounded-small px-3 text-default-500 text-small',
          isSelected && 'bg-default/40',
        )}
        onMouseEnter={() => {
          router.prefetch(`/chat/${id}`)
        }}
        onPress={onSelect}
      >
        <span className="max-w-[calc(100%-24px)] truncate">{title}</span>
      </Button>
      <Actions
        placement="right-start"
        isFavorite={isFavorite}
        onAction={handleActions}
      >
        <Button
          isIconOnly
          disableRipple
          variant="light"
          radius="full"
          size="sm"
          className="-translate-y-1/2 absolute top-1/2 right-0 text-default-500 opacity-0 hover:opacity-100 peer-hover:opacity-100 data-[hover=true]:bg-transparent data-[hover=true]:text-default-700"
        >
          <span className="iconify lucide--more-horizontal size-4" />
        </Button>
      </Actions>
    </li>
  )
}
