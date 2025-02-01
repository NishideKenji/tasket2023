'use client'

import { trpc } from '@/trpc/client'

export function GreetingClient({ name }: { name: string }) {
  // tRPC 問い合わせ. Client-Side から fetch を介して HTTP 送信される.
  const greeting = trpc.helloRouter.hello.useQuery({ text: name })

  return (
    <div className="bg-red-100 border-2 border-red-500 rounded-md m-2 p-5 space-y-2">
      <div className="text-red-500 font-bold">Client Component</div>
      <div>{JSON.stringify(greeting.data)}</div>
    </div>
  )
}
