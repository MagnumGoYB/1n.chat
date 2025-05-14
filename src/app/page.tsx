import NotSignInHeader from '@/components/not-signin-header'
import Welcome from '@/components/welcome'

export default async function RootPage() {
  return (
    <>
      <NotSignInHeader />
      <main className="flex w-full flex-1 items-center justify-center">
        <Welcome />
      </main>
    </>
  )
}
