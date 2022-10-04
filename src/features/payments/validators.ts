import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const contactInformationInput: z.ZodType<
  Omit<Prisma.ContactInformationCreateInput, 'User'>
> = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
})

export type ContactInformationInput = z.infer<typeof contactInformationInput>

export const addressInput: z.ZodType<Omit<Prisma.AddressCreateInput, 'User'>> =
  z.object({
    street: z.string().min(1),
    streetNumber: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  })

export type AddressInput = z.infer<typeof addressInput>
