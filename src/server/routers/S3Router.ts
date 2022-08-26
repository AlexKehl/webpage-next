import { router } from '@trpc/server'
import { S3 } from 'aws-sdk'
import Env from 'src/constants/EnvProxy'
import { z } from 'zod'
import { Context } from './CreateContext'

const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: Env.S3_ACCESS_KEY,
  secretAccessKey: Env.S3_SECRET_KEY,
  signatureVersion: 'v4',
})

export const s3Router = router<Context>().mutation('getUploadUrl', {
  input: z.object({
    name: z.string(),
    type: z.string(),
  }),
  async resolve({ input }) {
    const fileParams = {
      Bucket: Env.S3_BUCKET_NAME,
      Key: input.name,
      Expires: 600,
      ContentType: input.type,
    }

    const url = await s3.getSignedUrlPromise('putObject', fileParams)
    return url
  },
})
