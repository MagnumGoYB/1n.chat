'use server'

import { unstable_noStore as noStore } from 'next/cache'

import type {
  Conversation,
  ConversationWithMessages,
} from '@/types/conversation'

import { Conversations, Messages } from '@/lib/mock/conversation'

import { getCachedUser } from './user'

export const getConversations = async (): Promise<Conversation[]> => {
  noStore()

  const user = await getCachedUser()
  if (!user) return []

  return Conversations
}

export const getConversation = async (
  id: string,
): Promise<ConversationWithMessages | null> => {
  noStore()

  const user = await getCachedUser()
  if (!user) return null

  const conversation = Conversations.find(
    (conversation) => conversation.id === id,
  )
  if (!conversation) return null

  const messages = Messages.filter(
    (message) => message.conversationId === conversation.id,
  )

  return { ...conversation, messages }
}
