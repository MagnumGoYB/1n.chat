import { subtitle, title } from '@/components/primitives'

export default async function Chats() {
  return (
    <main className="flex w-full flex-1 justify-center">
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1 className={title()}>Chats</h1>
        <p className={subtitle()}>This is chats page</p>
      </section>
    </main>
  )
}
