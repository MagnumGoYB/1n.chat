import { getCachedUser } from '@/lib/queries/user'

import Welcome from '@/components/welcome'

export default async function AppPage() {
  const user = await getCachedUser()

  return <Welcome user={user} />
}
