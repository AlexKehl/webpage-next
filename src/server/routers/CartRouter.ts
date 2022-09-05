import { router, TRPCError } from '@trpc/server'
import cuid from 'cuid'
import prisma from 'src/lib/prisma'
import { Cart, GalleryImage } from 'src/types/PrismaProxy'
import { z } from 'zod'
import { Context } from './CreateContext'

export const cartRouter = router<Context>()
  .mutation('add', {
    input: z.object({ imageId: z.string() }),
    async resolve({ input, ctx }) {
      const userId = ctx.user?.id! // TODO add middleware for user validation
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { cart: true },
      })

      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { galleryImages: true },
      })

      const isAlreadyPresent = cart?.galleryImages.some(
        (image) => image.id === input.imageId
      )

      if (isAlreadyPresent) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Image is already in the cart',
        })
      }

      return prisma.cart.upsert({
        where: { id: user?.cart?.id || cuid() },
        create: {
          userId,
          galleryImages: { connect: [{ id: input.imageId }] },
        },
        update: {
          galleryImages: { connect: [{ id: input.imageId }] },
        },
      })
    },
  })
  .query('list', {
    async resolve({ ctx }) {
      const cart = await prisma.cart.findUnique({
        where: { userId: ctx.user?.id },
        include: { galleryImages: true },
      })

      return cart as (Cart & { galleryImages: GalleryImage[] }) | null
    },
  })
  .mutation('delete', {
    input: z.object({ imageId: z.string() }),
    async resolve({ input, ctx }) {
      return prisma.cart.update({
        where: { userId: ctx.user?.id },
        data: { galleryImages: { disconnect: { id: input.imageId } } },
      })
    },
  })
