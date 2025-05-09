import { createContext } from 'react'

type Context = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isSubPath: boolean
  parentNavName?: string
}

export const Context = createContext<Context | null>(null)
