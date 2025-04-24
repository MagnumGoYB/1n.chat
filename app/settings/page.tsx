import { subtitle, title } from '@/components/primitives'

export default async function Settings() {
  return (
    <section className="flex w-full flex-col space-y-5 p-4">
      <h1 className={title()}>Settings</h1>
      <p className={subtitle()}>This is settings page</p>
    </section>
  )
}
