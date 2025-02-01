import { trpc } from '@/trpc/server'

export async function GreetingServer({ name }: { name: string }) {
  // tRPC 問い合わせ. Server-Side なので直接接続されている.
  const greeting = await trpc.helloRouter.hello({ text: name })

  return (
    <div className="bg-blue-100 border-2 border-blue-500 rounded-md m-2 p-5 space-y-1">
      <div className="text-blue-500 font-bold">Server Component</div>
      <div>{JSON.stringify(greeting)}</div>
    </div>
  )
}
