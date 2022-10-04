import { router } from '@trpc/server'
import {
  addressInput,
  contactInformationInput,
} from 'src/features/payments/validators'
import prisma from 'src/lib/prisma'
import { isAuthorized } from '../middleware/Auth'
import { Context } from './CreateContext'

export const checkoutRouter = router<Context>()
  .middleware(isAuthorized)
  .mutation('updateContactInformation', {
    input: contactInformationInput,
    async resolve({ input, ctx }) {
      await prisma.contactInformation.upsert({
        where: { userId: ctx.user.id },
        create: { ...input, userId: ctx.user.id },
        update: input,
      })
    },
  })
  .query('getContactInformation', {
    async resolve({ ctx }) {
      const res = await prisma.contactInformation.findUnique({
        where: { userId: ctx.user.id },
      })
      return res as NonNullable<typeof res> | undefined
    },
  })
  .mutation('updateAddressInformation', {
    input: addressInput,
    async resolve({ input, ctx }) {
      await prisma.address.upsert({
        where: { userId: ctx.user.id },
        create: { ...input, userId: ctx.user.id },
        update: input,
      })
    },
  })
  .query('getAddress', {
    async resolve({ ctx }) {
      const res = await prisma.address.findUnique({
        where: { userId: ctx.user.id },
      })
      return res as NonNullable<typeof res> | undefined
    },
  })
