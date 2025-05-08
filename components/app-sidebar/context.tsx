import { createContext } from 'react'

import type { User } from '@/lib/types/user'

type Context = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isSubPath: boolean
  parentNavName?: string
  user: User | null
}

export const Context = createContext<Context | null>(null)
