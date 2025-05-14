'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Conversation } from '@/types/conversation'
import type { User } from '@/types/user'

import { authConfig } from '@/config/auth'
import { Conversations } from '@/lib/mock/conversation'
import { Users } from '@/lib/mock/user'

const sessionKey = authConfig.sessionKey

export const getCurrentUser = async (): Promise<User | null> => {
  noStore()

  const cookieStore = await cookies()
  const sessionId = cookieStore.get(sessionKey)?.value
  if (!sessionId) {
    return null
  }

  const user = Users.find((user) => user.id === sessionId)
  if (!user) {
    return null
  }

  return user
}

export const getCachedUser = cache(getCurrentUser)

export const getConversations = async (): Promise<Conversation[]> => {
  noStore()

  const user = await getCurrentUser()
  if (!user) return []

  return Conversations
}
