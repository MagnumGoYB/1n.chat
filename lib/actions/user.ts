'use server'

import { cookies } from 'next/headers'

import { authConfig } from '@/config/auth'
import { Users } from '@/lib/mock/user'

const sessionKey = authConfig.sessionKey

export async function signIn(id: string) {
  if (!id) {
    return { data: null, error: 'User ID is required' }
  }
  const user = Users.find((user) => user.id === id)
  if (!user) {
    return { data: null, error: 'User not found' }
  }
  const cookieStore = await cookies()
  cookieStore.set(sessionKey, id, {
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  })

  return { data: user, error: null }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete(sessionKey)
  return { data: 'ok', error: null }
}
