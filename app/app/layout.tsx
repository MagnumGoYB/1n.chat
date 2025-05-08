import { redirect } from 'next/navigation'

import AppSidebar from '@/components/app-sidebar'
import Conversation from '@/components/conversation'
import SidebarNav from '@/components/sidebar-nav'
import { getCachedUser } from '@/lib/queries/user'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCachedUser()

  if (!user) redirect('/')

  return (
    <AppSidebar
      user={user}
      nav={<SidebarNav />}
      conversation={<Conversation />}
    >
      {children}
    </AppSidebar>
  )
}
