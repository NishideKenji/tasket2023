import { z } from 'zod'

import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const helloRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      // zod による入力バリデーション.
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // tRPC API 応答の実装.
      return {
        // コンテキスト `ctx` と入力 `input` を参照できる.
        greeting: `hello !!, user:${opts.ctx.session?.user?.name} ${opts.input.text}`,
      }
    }),
})
