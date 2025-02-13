'use client'

import { trpc } from '@/trpc/client'

export function TrpcExampleClient({ name }: { name: string }) {
  const { data } = trpc.helloRouter.hello.useQuery({ text: name })

  return <div>Client:{data?.ans}</div>
}
