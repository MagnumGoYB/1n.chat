import { useContext } from 'react'

import { Context } from './context'

export default function useAppSidebar() {
  const context = useContext(Context)

  if (!context) {
    throw new Error(
      'useAppSidebar must be used within a AppSidebarContextProvider',
    )
  }

  return context
}
