'use client'

import { Avatar, cn } from '@heroui/react'
import { upperFirst } from 'es-toolkit/string'

import type { Message as MessageType } from '@/types/message'

import ModelIcon from './model-icon'

interface AssistantMessageProps extends Omit<MessageType, 'role'> {
  role: 'assistant'
}

interface UserMessageProps extends Omit<MessageType, 'role' | 'model'> {
  role: 'user'
}

export type MessageProps = AssistantMessageProps | UserMessageProps

export default function Message(props: MessageProps) {
  const { role, content } = props
  const model = role === 'assistant' ? props.model : null

  return (
    <div
      className={cn('flex w-full items-start', {
        'justify-start': role === 'assistant',
        'justify-end': role === 'user',
      })}
      aria-label={`${upperFirst(role)} Message `}
    >
      {model && (
        <Avatar
          className="h-7 w-7 border bg-transparent"
          icon={<ModelIcon modelKey={model.icon} />}
          alt={model.name}
        />
      )}
      <div
        className={cn(
          'relative flex overflow-hidden rounded-medium px-4 font-medium text-small',
          role === 'user' && 'bg-default-100 py-3 text-foreground',
          role === 'assistant' && 'bg-transparent py-[5px] text-foreground',
        )}
      >
        <div>{content}</div>
      </div>
    </div>
  )
}
