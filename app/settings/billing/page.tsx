import { subtitle, title } from '@/components/primitives'

export default async function Billing() {
  return (
    <section className="flex w-full flex-col space-y-5 p-4">
      <h1 className={title()}>Billing</h1>
      <p className={subtitle()}>This is billing page</p>
    </section>
  )
}
