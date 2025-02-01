import { GreetingClient } from './_components/greeting-client'
import { GreetingServer } from './_components/greeting-server'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Client Component からの tRPC 問い合わせ. */}
      <GreetingClient name="Client 1" />
      <GreetingClient name="Client 2" />

      {/* SSR Component からの tRPC 問い合わせ. */}
      <GreetingServer name="Server 1" />
    </main>
  )
}
