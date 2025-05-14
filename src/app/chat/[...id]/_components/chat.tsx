'use client'

import type { Message as MessageType } from '@/types/conversation'

import Message from '@/components/message'
import ScrollArea from '@/components/scroll-area'

interface ChatProps {
  messages: MessageType[]
}

export default function Chat(props: ChatProps) {
  const { messages = [] } = props

  return (
    <ScrollArea
      classNames={{
        root: 'w-full p-0',
        scrollbar: 'w-2.5',
        thumb: 'bg-default-200 hover:bg-default-300',
      }}
      areaProps={{ type: 'scroll' }}
    >
      <div className="flex w-full justify-center pb-12">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              role={message.role}
              content={message.content}
              model={message.model}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
