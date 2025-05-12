import PromptInput from '@/components/prompt-input'

import type { Message as MessageType } from '@/types/message'

import Conversation from './_components/conversation'

const messages = [
  {
    id: '1',
    role: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: '2',
    role: 'assistant',
    content: "I'm fine, thank you!",
    model: { id: 'gemini-2.5-flash', icon: 'Gemini', name: 'Gemini 2.5 Flash' },
  },
  {
    id: '3',
    role: 'user',
    content: 'What can you do?',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'I can do many things!',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
  {
    id: '5',
    role: 'user',
    content: 'Can you tell me a joke?',
  },
  {
    id: '6',
    role: 'assistant',
    content:
      'Sure! Why did the chicken cross the road? To get to the other side!',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
  {
    id: '7',
    role: 'user',
    content: 'That was funny!',
  },
  {
    id: '8',
    role: 'assistant',
    content: 'I am glad you liked it!',
    model: { id: 'gemini-2.5-flash', icon: 'Gemini', name: 'Gemini 2.5 Flash' },
  },
  {
    id: '9',
    role: 'user',
    content: 'What is the weather like today?',
  },
  {
    id: '10',
    role: 'assistant',
    content: 'The weather is sunny with a chance of rain later.',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
] satisfies MessageType[]

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log('This is conversation id:', id)

  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="flex max-h-[calc(100dvh-120px)] w-full flex-1 overflow-hidden">
        <Conversation messages={messages} />
      </section>
      <section className="absolute bottom-0 flex w-full items-center justify-center px-2">
        <div className="w-full max-w-3xl">
          <PromptInput className="rounded-b-none border border-b-0" />
        </div>
      </section>
    </main>
  )
}
