'use client'

import type { TextAreaProps } from '@heroui/react'
import type { FC } from 'react'

import { Button, Textarea, cn } from '@heroui/react'
import { useState } from 'react'

import type { Model } from '@/types/model'

import ModelSwitcher from '@/components/model-switcher'
import { useUserGuard } from '@/components/user-guard-provider'

type PromptInputProps = {
  className?: string
  actionsClassName?: string
  textareaProps?: Omit<TextAreaProps, 'onValueChange' | 'value'>
  onSend?: (model: Model, input: string) => void
}

const PromptInput: FC<PromptInputProps> = (props) => {
  const { className, actionsClassName, textareaProps, onSend } = props

  const [value, setValue] = useState('')
  const [model, setModel] = useState<Model | null>(null)
  const { withCheckLoggedIn } = useUserGuard()

  const trimmedValue = value.trim()

  const handleAttachFile = () => {
    console.log('Attach file clicked')
  }

  const handleSelectModel = (_: string, model: Model) => {
    setModel(model)
  }

  const handleSend = () => {
    if (!model || !trimmedValue) return
    onSend?.(model, trimmedValue)
    setValue('')
  }

  return (
    <div
      className={cn(
        'relative flex w-full cursor-text flex-col items-start rounded-medium bg-default-100',
        className,
      )}
    >
      <Textarea
        isClearable
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder="Type your message here..."
        size="lg"
        minRows={2}
        maxRows={8}
        onValueChange={setValue}
        value={value}
        {...textareaProps}
        classNames={{
          mainWrapper: 'w-full',
          inputWrapper: '!bg-transparent shadow-none',
          input: 'scrollbar-hide px-0.5 pt-1',
          ...textareaProps?.classNames,
        }}
      />
      <div
        className={cn(
          'flex w-full cursor-text items-center justify-between px-2.5 pb-2.5',
          actionsClassName,
        )}
      >
        <div className="flex items-center gap-0">
          <ModelSwitcher onSelectModel={withCheckLoggedIn(handleSelectModel)} />
        </div>
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            aria-label="Attaching files is a subscriber-only feature"
            radius="full"
            className="pointer-events-auto"
            variant="light"
            size="sm"
            onPress={withCheckLoggedIn(handleAttachFile)}
          >
            <span className="iconify tabler--paperclip size-[18px] text-default-600" />
          </Button>
          <Button
            isIconOnly
            aria-label="Send"
            radius="full"
            size="sm"
            variant="solid"
            className="pointer-events-auto bg-foreground text-background disabled:cursor-default disabled:bg-default-300 disabled:text-default-foreground/80 disabled:opacity-disabled"
            isDisabled={!trimmedValue || !model}
            onPress={withCheckLoggedIn(handleSend)}
          >
            <span className="iconify tabler--arrow-big-up size-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PromptInput
