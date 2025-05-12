import type { Model } from './model'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: Pick<Model, 'id' | 'name' | 'icon'>
}
