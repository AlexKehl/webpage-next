import { publicProcedure, router } from '../trpc'
import {
  addressInput,
  contactInformationInput,
} from 'src/features/payments/validators'
import prisma from 'src/lib/prisma'
import { isAuthorized } from '../middleware/Auth'

export const checkoutRouter = router({
  updateContactInformation: publicProcedure
    .use(isAuthorized)
    .input(contactInformationInput)
    .mutation(async ({ input, ctx }) => {
      await prisma.contactInformation.upsert({
        where: { userId: ctx.user.id },
        create: { ...input, userId: ctx.user.id },
        update: input,
      })
    }),
  getContactInformation: publicProcedure
    .use(isAuthorized)
    .query(async ({ ctx }) => {
      const res = await prisma.contactInformation.findUnique({
        where: { userId: ctx.user.id },
      })
      return res as NonNullable<typeof res> | undefined
    }),
  updateAddressInformation: publicProcedure
    .use(isAuthorized)
    .input(addressInput)
    .mutation(async ({ input, ctx }) => {
      await prisma.address.upsert({
        where: { userId: ctx.user.id },
        create: { ...input, userId: ctx.user.id },
        update: input,
      })
    }),
  getAddress: publicProcedure.use(isAuthorized).query(async ({ ctx }) => {
    const res = await prisma.address.findUnique({
      where: { userId: ctx.user.id },
    })
    return res as NonNullable<typeof res> | undefined
  }),
})
