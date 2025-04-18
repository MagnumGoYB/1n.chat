import AppSidebar from '@/components/app-sidebar'
import Conversations from '@/components/conversations'
import { Counter } from '@/components/counter'
import CurrentUser from '@/components/current-user'
import { Logo } from '@/components/icons'
import { subtitle, title } from '@/components/primitives'
import SidebarNav from '@/components/sidebar-nav'
import ThemeSwitcher from '@/components/theme-switcher'
import { siteConfig } from '@/config/site'

export default async function Home() {
  return (
    <AppSidebar
      logo={<Logo />}
      nav={<SidebarNav items={siteConfig.nav} />}
      conversation={<Conversations />}
      user={
        <CurrentUser
          name="Admin"
          email="admin@example.com"
          avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      }
    >
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1 className={title()}>Home</h1>
        <p className={subtitle()}>This is home page</p>
        <ThemeSwitcher />
        <div>
          <Counter />
        </div>
      </section>
    </AppSidebar>
  )
}
