import type { Model } from './model'

export type Conversation = {
  id: string
  title: string
  isFavorite?: boolean
  isPinned?: boolean
}

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: Pick<Model, 'id' | 'name' | 'icon'>
}
