import { createContext } from 'react'

import type { Message as MessageType } from '@/types/conversation'

type Context = {
  id: string
  title: string
  isFavorite?: boolean
  messages: MessageType[]
}

export const Context = createContext<Context | null>(null)
