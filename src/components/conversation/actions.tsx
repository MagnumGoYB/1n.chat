'use client'

import type { DropdownProps } from '@heroui/react'
import type { Key, PropsWithChildren } from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from '@heroui/react'

export interface ActionsProps {
  isFavorite?: boolean
  placement?: DropdownProps['placement']
  className?: string
  classNames?: DropdownProps['classNames']
  onAction?: (key: Key) => void
}

export default function Actions(props: PropsWithChildren<ActionsProps>) {
  const {
    placement = 'bottom-start',
    isFavorite,
    children,
    onAction,
    className,
    classNames,
  } = props

  return (
    <Dropdown
      classNames={classNames}
      placement={placement}
      className={cn('min-w-36', className)}
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        aria-label="Conversation Actions"
        variant="flat"
        selectionMode="none"
        onAction={onAction}
      >
        {isFavorite ? (
          <DropdownItem
            key="favorite"
            textValue="Favorite"
            startContent={<span className="iconify tabler--star size-4" />}
          >
            Unfavorite
          </DropdownItem>
        ) : (
          <DropdownItem
            key="favorite"
            textValue="Favorite"
            startContent={<span className="iconify tabler--star size-4" />}
          >
            Favorite
          </DropdownItem>
        )}
        <DropdownItem
          key="rename"
          textValue="Rename"
          startContent={<span className="iconify tabler--pencil size-4" />}
        >
          Rename
        </DropdownItem>
        <DropdownItem
          key="duplicate"
          textValue="Duplicate"
          startContent={<span className="iconify tabler--copy size-4" />}
        >
          Duplicate
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
  )
}
