import type { Key } from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from '@heroui/react'
import { useRouter } from 'next/navigation'

interface ConversationItemProps {
  id: string
  title: string
  isSelected?: boolean
  onSelect?: () => void
}

export default function ConversationItem({
  id,
  title,
  onSelect,
  isSelected,
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
      <Dropdown placement="right-start">
        <DropdownTrigger>
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
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Conversation Actions"
          variant="flat"
          selectionMode="none"
          onAction={handleActions}
        >
          <DropdownItem
            key="rename"
            textValue="Rename"
            startContent={<span className="iconify tabler--pencil size-4" />}
          >
            Rename
          </DropdownItem>
          <DropdownItem
            key="favorite"
            textValue="Favorite"
            startContent={<span className="iconify tabler--star size-4" />}
          >
            Favorite
          </DropdownItem>
          <DropdownItem
            key="delete"
            textValue="Delete"
            className="text-danger"
            color="danger"
            startContent={<span className="iconify tabler--trash size-4" />}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </li>
  )
}
