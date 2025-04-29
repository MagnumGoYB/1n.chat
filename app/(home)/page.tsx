import { title } from '@/components/primitives'
import PromptInput from '@/components/prompt-input'
import { getCachedUser } from '@/lib/queries/user'

export default async function Home() {
  const user = await getCachedUser()
  return (
    <section className="relative flex w-full max-w-xl flex-col items-center space-y-6">
      <h1 className={title({ size: 'sm', className: 'font-bold' })}>
        How can I help you?
      </h1>
      <PromptInput user={user} />
    </section>
  )
}
