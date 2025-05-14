import { useContext } from 'react'

import { Context } from './context'

export default function useChat() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useChat must be used within a ChatContextProvider')
  }

  return context
}
