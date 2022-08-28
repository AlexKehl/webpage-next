import { router } from '@trpc/server'
import Env from 'src/constants/EnvProxy'
import prisma from 'src/lib/prisma'
import { filterNullValues } from 'src/lib/utils/PrismaUtils'
import { GalleryImage } from 'src/types/PrismaProxy'
import { z } from 'zod'
import { Context } from './CreateContext'
import { s3 } from './S3Router'

const categoryZod = z.enum(['acryl', 'oil', 'graphics', 'other'])

const imageSaveInput: z.ZodType<GalleryImage> = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  width: z.string(),
  height: z.string(),
  category: categoryZod,
  isForSell: z.boolean().optional(),
  price: z.number().optional(),
  url: z.string(),
})

const imageUpdateInput: z.ZodType<Partial<GalleryImage>> = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  category: categoryZod.optional(),
  isForSell: z.boolean().optional(),
  price: z.number().optional(),
  url: z.string().optional(),
})

export const galleryImageRouter = router<Context>()
  .mutation('save', {
    input: imageSaveInput,
    async resolve({ input }) {
      return prisma.galleryImage.create({
        data: input,
      })
    },
  })
  .mutation('update', {
    input: imageUpdateInput,
    async resolve({ input }) {
      return prisma.galleryImage.update({
        where: { id: input.id },
        data: input,
      })
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      await s3
        .deleteObject({
          Bucket: Env.S3_BUCKET_NAME,
          Key: input.id,
        })
        .promise()
      return prisma.galleryImage.delete({
        where: { id: input.id },
      })
    },
  })
  .query('imagesList', {
    input: z.object({
      category: categoryZod,
    }),
    async resolve({ input }) {
      const res = await prisma.galleryImage.findMany({
        where: {
          category: { equals: input.category },
        },
      })
      return res.map(filterNullValues) as GalleryImage[]
    },
  })
