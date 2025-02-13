import { trpc } from '@/trpc/server'

export async function TrpcExampleServer({ name }: { name: string }) {
  const data = await trpc.helloRouter.hello({ text: name })

  return <div>Server:{data?.ans}</div>
}
