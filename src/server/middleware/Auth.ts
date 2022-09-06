import { router, TRPCError } from '@trpc/server'
import { User } from 'src/types/PrismaProxy'
import { Context } from '../routers/CreateContext'

type MiddleWareParams = Parameters<
  Parameters<ReturnType<typeof router<Context>>['middleware']>[0]
>[0]

export const isAuthorized = async ({ ctx, next }: MiddleWareParams) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user as User,
    },
  })
}
