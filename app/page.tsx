import { redirect } from 'next/navigation'

import NotSignInHeader from '@/components/not-signin-header'
import Welcome from '@/components/welcome'
import { getCachedUser } from '@/lib/queries/user'

export default async function RootPage() {
  const user = await getCachedUser()

  if (user) redirect('/app')

  return (
    <div className="relative flex h-dvh w-full items-center justify-center">
      <NotSignInHeader />
      <Welcome user={null} />
    </div>
  )
}
