import AppSidebar from '@/components/app-sidebar'
import { Counter } from '@/components/counter'
import { subtitle, title } from '@/components/primitives'
import ThemeSwitcher from '@/components/theme-switcher'

export default async function Home() {
  return (
    <AppSidebar>
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1 className={title()}>Home</h1>
        <h4 className={subtitle()}>This is home page</h4>
        <ThemeSwitcher />
        <div>
          <Counter />
        </div>
      </section>
    </AppSidebar>
  )
}
