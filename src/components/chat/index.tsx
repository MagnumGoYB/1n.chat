'use client'

import type { ElementRef } from 'react'

import { Button, cn } from '@heroui/react'
import { useRef, useState } from 'react'

import type { OnScrollState } from '@/components/scroll-area'
import type { Message as MessageType } from '@/types/conversation'
import type { Model } from '@/types/model'

import Actions from '@/components/conversation/actions'
import PromptInput from '@/components/prompt-input'
import Welcome from '@/components/welcome'

import ChatFlow from './chat-flow'
import { Context } from './context'

interface ChatProps {
  id: string
  title: string
  isFavorite?: boolean
  messages: MessageType[]
}

export default function Chat(props: ChatProps) {
  const { id, isFavorite, title, messages = [] } = props

  const chatFlowRef = useRef<ElementRef<typeof ChatFlow>>(null)

  const [scrollState, setScrollState] = useState<OnScrollState>({
    isAtTop: true,
    isAtBottom: false,
  })

  const hasMessages = messages.length > 0

  const scrollToBottom = () => {
    chatFlowRef.current?.scrollToBottom()
  }

  const handleSend = (model: Model, value: string) => {
    console.log('Send message:', value, 'model:', model, 'conversation id:', id)
  }

  return (
    <Context.Provider value={{ id, isFavorite, title, messages }}>
      <section
        className={cn('flex w-full flex-1', {
          'max-h-[calc(100dvh-120px)]': hasMessages,
        })}
      >
        <div className="flex h-full w-full flex-col overflow-hidden">
          <div className="flex h-14 items-center justify-between gap-x-2 px-4">
            <Actions placement="bottom-end" isFavorite={isFavorite}>
              <Button
                disableRipple
                variant="light"
                className=""
                size="sm"
                endContent={
                  <span className="iconify lucide--chevron-down size-4" />
                }
              >
                <span className="font-medium text-small">{title}</span>
              </Button>
            </Actions>
          </div>
          {hasMessages ? (
            <ChatFlow
              ref={chatFlowRef}
              messages={messages}
              onScroll={setScrollState}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Welcome conversationId={id} />
            </div>
          )}
        </div>
      </section>
      {hasMessages && (
        <section className="absolute bottom-0 flex w-full flex-col items-center justify-center px-2">
          {!scrollState.isAtBottom && (
            <Button
              isIconOnly
              aria-label="Scroll to bottom"
              radius="full"
              className="-top-12 absolute border bg-white font-medium dark:border-default-200 dark:bg-default-100"
              size="sm"
              variant="shadow"
              onPress={scrollToBottom}
            >
              <span className="iconify lucide--chevrons-down size-[18px] text-default-800" />
            </Button>
          )}
          <div className="w-full max-w-3xl">
            <PromptInput
              className="rounded-b-none border border-b-0 dark:border-default-200 dark:bg-default-100"
              actionsClassName="px-2 pb-1.5"
              textareaProps={{
                placeholder: 'Ask a follow up question...',
                classNames: { input: 'text-sm pt-1.5' },
              }}
              onSend={handleSend}
            />
          </div>
        </section>
      )}
    </Context.Provider>
  )
}
