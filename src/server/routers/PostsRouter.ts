import * as trpc from '@trpc/server'
import { z } from 'zod'
import { Context } from './CreateContext'
import prisma from 'src/lib/prisma'

export const postsRouter = trpc
  .router<Context>()
  .query('list', {
    async resolve() {
      const res = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, email: true },
          },
        },
      })
      return res
    },
  })
  .query('drafts', {
    async resolve({ ctx }) {
      const drafts = await prisma.post.findMany({
        where: {
          author: { email: ctx.user!.email },
          published: false,
        },
        include: {
          author: {
            select: { name: true, email: true },
          },
        },
      })
      return drafts
    },
  })
  .query('get', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const drafts = await prisma.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: {
            select: { name: true, email: true },
          },
        },
      })
      return drafts
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not delete a post while logged out',
        })
      }

      const post = await ctx.prisma.post.delete({
        where: { id: input.id },
      })

      return post
    },
  })
  .mutation('publish', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not publish post while logged out',
        })
      }

      const post = await prisma.post.update({
        where: { id: input.id },
        data: { published: true },
      })

      return post
    },
  })
