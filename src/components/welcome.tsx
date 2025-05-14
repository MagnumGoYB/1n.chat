import { title } from '@/components/primitives'
import PromptInput from '@/components/prompt-input'

export default function Welcome() {
  return (
    <section className="relative flex w-full max-w-xl flex-col items-center space-y-6">
      <h1 className={title({ size: 'sm', className: 'font-bold' })}>
        How can I help you?
      </h1>
      <PromptInput />
    </section>
  )
}
