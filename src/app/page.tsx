import NotSignInHeader from '@/components/not-signin-header'
import Welcome from '@/components/welcome'

export default async function RootPage() {
  return (
    <>
      <NotSignInHeader />
      <Welcome />
    </>
  )
}
