'use client'

import { Button, cn } from '@heroui/react'

import type { Message as MessageType } from '@/types/conversation'

import Actions from '@/components/conversation/actions'
import Message from '@/components/message'
import PromptInput from '@/components/prompt-input'
import ScrollArea from '@/components/scroll-area'
import Welcome from '@/components/welcome'

import { Context } from './context'
import useChat from './use-chat'

interface ChatProps {
  id: string
  title: string
  isFavorite?: boolean
  messages: MessageType[]
}

export default function Chat(props: ChatProps) {
  const { id, isFavorite, title, messages = [] } = props

  const hasMessages = messages.length > 0

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
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Welcome />
            </div>
          )}
        </div>
      </section>
      {hasMessages && (
        <section className="absolute bottom-0 flex w-full items-center justify-center px-2">
          <div className="w-full max-w-3xl">
            <PromptInput
              className="rounded-b-none border border-b-0"
              actionsClassName="px-2 pb-1.5"
              textareaProps={{
                placeholder: 'Ask a follow up question...',
                classNames: { input: 'text-sm pt-1.5' },
              }}
            />
          </div>
        </section>
      )}
    </Context.Provider>
  )
}

export { useChat }
