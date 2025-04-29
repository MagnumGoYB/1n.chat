import { getCachedUser } from '@/lib/queries/user'
import Header from './_components/header'

export default async function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  const user = await getCachedUser()

  if (!user) {
    return (
      <div className="relative flex h-dvh w-full items-center justify-center">
        <Header />
        <main className="flex w-full flex-1 items-center justify-center">
          {children}
        </main>
      </div>
    )
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      {children}
    </main>
  )
}
