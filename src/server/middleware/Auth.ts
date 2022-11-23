import { TRPCError } from '@trpc/server'
import { User } from 'src/types/PrismaProxy'
import { middleware } from '../trpc'

export const isAuthorized = middleware(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user as User,
    },
  })
})
