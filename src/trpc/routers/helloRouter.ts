import { z } from 'zod'

import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const helloRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      // 入力値検証
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        // hello !! と入力値を返す
        ans: `hello !!, ${opts.input.text}`,
      }
    }),
})
