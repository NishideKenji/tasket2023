import type * as trpc from '@trpc/server'
import type * as trpcNext from '@trpc/server/adapters/next'

import prisma from './prisma'

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  return {
    prisma,
  }
}

export type IContext = trpc.inferAsyncReturnType<typeof createContext>
