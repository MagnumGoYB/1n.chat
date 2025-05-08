'use client'

import { title } from '@/components/primitives'
import PromptInput from '@/components/prompt-input'

import type { User } from '@/lib/types/user'

interface WelcomeProps {
  user: User | null
}

export default function Welcome({ user }: WelcomeProps) {
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <section className="relative flex w-full max-w-xl flex-col items-center space-y-6">
        <h1 className={title({ size: 'sm', className: 'font-bold' })}>
          How can I help you?
        </h1>
        <PromptInput user={user} />
      </section>
    </main>
  )
}
