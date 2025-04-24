import { subtitle, title } from '@/components/primitives'

export default async function Plans() {
  return (
    <section className="flex w-full flex-col space-y-5 p-4">
      <h1 className={title()}>Plans</h1>
      <p className={subtitle()}>This is plans page</p>
    </section>
  )
}
