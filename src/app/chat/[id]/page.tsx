import Chat from '@/components/chat'
import { getConversation } from '@/lib/queries/conversation'
import { notFound } from 'next/navigation'

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const conversation = await getConversation(id)

  if (!conversation) {
    notFound()
  }

  return (
    <main className="flex w-full flex-1 flex-col">
      <Chat {...conversation} />
    </main>
  )
}
