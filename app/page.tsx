import AppSidebar from '@/components/app-sidebar'
import { Counter } from '@/components/counter'
import { ThemeSwitch } from '@/components/theme-switch'

export default async function Home() {
  return (
    <AppSidebar>
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1>Home</h1>
        <ThemeSwitch />
        <div>
          <Counter />
        </div>
      </section>
    </AppSidebar>
  )
}
