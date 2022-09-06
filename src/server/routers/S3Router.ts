import { router } from '@trpc/server'
import { S3 } from 'aws-sdk'
import cuid from 'cuid'
import Env from 'src/constants/EnvProxy'
import { z } from 'zod'
import { isAuthorized } from '../middleware/Auth'
import { Context } from './CreateContext'

export const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: Env.S3_ACCESS_KEY,
  secretAccessKey: Env.S3_SECRET_KEY,
  signatureVersion: 'v4',
})

export const s3Router = router<Context>()
  .middleware(isAuthorized)
  .query('getUploadUrl', {
    input: z.object({
      name: z.string(),
      contentType: z.string(),
    }),
    async resolve({ input }) {
      const id = cuid()
      const fileParams = {
        Bucket: Env.S3_BUCKET_NAME,
        Key: id,
        Expires: 600,
        ContentType: input.contentType,
      }

      const uploadUrl = await s3.getSignedUrlPromise('putObject', fileParams)
      return { uploadUrl, id }
    },
  })
