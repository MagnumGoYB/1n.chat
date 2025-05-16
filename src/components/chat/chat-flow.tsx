import type { ComponentProps } from 'react'

import { forwardRef, useImperativeHandle } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import type { Message as MessageType } from '@/types/conversation'

import Message from '@/components/message'
import ScrollArea from '@/components/scroll-area'

interface ChatFlowProps {
  messages: MessageType[]
  onScroll?: ComponentProps<typeof ScrollArea>['onScroll']
}

interface ChatFlowRef {
  scrollToBottom: () => void
}

const ChatFlow = forwardRef<ChatFlowRef, ChatFlowProps>((props, ref) => {
  const { messages = [], onScroll } = props

  const [bottomRef, isAtBottom, bottomEntry] = useIntersectionObserver()

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (isAtBottom) return
      bottomEntry?.target.scrollIntoView({ behavior: 'smooth' })
    },
  }))

  return (
    <ScrollArea
      classNames={{
        root: 'w-full p-0',
        scrollbar: 'w-2.5',
        thumb: 'bg-default-200 hover:bg-default-300',
      }}
      areaProps={{ type: 'scroll' }}
      onScroll={onScroll}
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
      <div ref={bottomRef} className="h-px w-full" />
    </ScrollArea>
  )
})

ChatFlow.displayName = 'ChatFlow'

export default ChatFlow
