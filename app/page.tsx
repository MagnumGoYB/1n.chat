import AppSidebar from '@/components/app-sidebar'
import { Counter } from '@/components/counter'
import ThemeSwitcher from '@/components/theme-switcher'

export default async function Home() {
  return (
    <AppSidebar>
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1>Home</h1>
        <ThemeSwitcher />
        <div>
          <Counter />
        </div>
      </section>
    </AppSidebar>
  )
}
