import { GalleryImage } from '@prisma/client'
import { router } from '@trpc/server'
import { s3 } from 'pages/api/s3/uploadFile'
import Env from 'src/constants/EnvProxy'
import prisma from 'src/lib/prisma'
import { z } from 'zod'
import { Context } from './CreateContext'

const categoryZod = z.enum(['acryl', 'oil', 'graphics', 'other'])

const imageSaveInput: z.ZodType<Omit<GalleryImage, 'id'>> = z.object({
  name: z.string(),
  description: z.string().nullable(),
  width: z.string(),
  height: z.string(),
  category: categoryZod,
  isForSell: z.boolean().nullable(),
  price: z.number().nullable(),
  url: z.string(),
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
  .mutation('delete', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const imageDbObject = await prisma.galleryImage.findUnique({
        where: { id: input.id },
      })
      await s3
        .deleteObject({
          Bucket: Env.S3_BUCKET_NAME,
          Key: imageDbObject?.name!,
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
      return prisma.galleryImage.findMany({
        where: {
          category: { equals: input.category },
        },
      })
    },
  })
