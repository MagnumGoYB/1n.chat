import { createContext } from 'react'

type Context = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export const Context = createContext<Context | null>(null)
