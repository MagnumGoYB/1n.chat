'use client'

import type { Model } from '@/types/model'

import { title } from '@/components/primitives'
import PromptInput from '@/components/prompt-input'

interface WelcomeProps {
  conversationId?: string
}

export default function Welcome({ conversationId }: WelcomeProps) {
  const handleSend = (model: Model, value: string) => {
    console.log(
      'Send message:',
      value,
      'model:',
      model,
      'conversation id:',
      conversationId,
    )
  }

  return (
    <section className="relative flex w-full max-w-xl flex-col items-center space-y-6">
      <h1 className={title({ size: 'sm', className: 'font-bold' })}>
        How can I help you?
      </h1>
      <PromptInput onSend={handleSend} />
    </section>
  )
}
