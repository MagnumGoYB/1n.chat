import { subtitle, title } from '@/components/primitives'

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main className="flex w-full flex-1 justify-center">
      <section className="flex w-full flex-col space-y-5 p-4">
        <h1 className={title()}>Chat ID: {id}</h1>
        <p className={subtitle()}>This is chat page</p>
      </section>
    </main>
  )
}
