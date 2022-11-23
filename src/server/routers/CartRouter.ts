import { TRPCError } from '@trpc/server'
import cuid from 'cuid'
import { publicProcedure, router } from '../trpc'
import prisma from 'src/lib/prisma'
import { Cart, GalleryImage } from 'src/types/PrismaProxy'
import { z } from 'zod'
import { isAuthorized } from '../middleware/Auth'

export const cartRouter = router({
  add: publicProcedure
    .use(isAuthorized)
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user['id']

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
    }),
  list: publicProcedure.use(isAuthorized).query(async ({ ctx }) => {
    const cart = await prisma.cart.findUnique({
      where: { userId: ctx.user.id },
      include: { galleryImages: true },
    })

    return cart as (Cart & { galleryImages: GalleryImage[] }) | null
  }),
  delete: publicProcedure
    .use(isAuthorized)
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.cart.update({
        where: { userId: ctx.user.id },
        data: { galleryImages: { disconnect: { id: input.imageId } } },
      })
    }),
  clear: publicProcedure.use(isAuthorized).mutation(async ({ ctx }) => {
    const cart = await prisma.cart.findUnique({
      where: { userId: ctx.user.id },
      include: { galleryImages: true },
    })
    const imagesInCartIds = cart?.galleryImages.map(({ id }) => ({ id }))

    return prisma.cart.update({
      where: { userId: ctx.user.id },
      data: { galleryImages: { disconnect: imagesInCartIds } },
    })
  }),
})
