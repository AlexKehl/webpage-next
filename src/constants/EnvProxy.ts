import { z } from 'zod'

const ServerEnvSchema = z.object({
  COGNITO_CLIENT_ID: z.string(),
  COGNITO_CLIENT_SECRET: z.string(),
  COGNITO_ISSUER: z.string(),
  NODE_ENV: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
})

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_API: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_S3_BUCKET_URL: z.string(),
})

const ClientEnvObj: z.infer<typeof ClientEnvSchema> = {
  NEXT_PUBLIC_API: process.env['NEXT_PUBLIC_API']!,
  NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL']!,
  NEXT_PUBLIC_S3_BUCKET_URL: process.env['NEXT_PUBLIC_S3_BUCKET_URL']!,
}

const ServerEnvObj: z.infer<typeof ServerEnvSchema> = {
  COGNITO_CLIENT_ID: process.env['COGNITO_CLIENT_ID']!,
  COGNITO_CLIENT_SECRET: process.env['COGNITO_CLIENT_SECRET']!,
  COGNITO_ISSUER: process.env['COGNITO_ISSUER']!,
  NODE_ENV: process.env['NODE_ENV']!,
  S3_ACCESS_KEY: process.env['S3_ACCESS_KEY']!,
  S3_SECRET_KEY: process.env['S3_SECRET_KEY']!,
  S3_BUCKET_NAME: process.env['S3_BUCKET_NAME']!,
}

export const EnvSchema = ServerEnvSchema.merge(ClientEnvSchema)

let Env: z.infer<typeof EnvSchema>

if (process.env['NODE']) {
  // @ts-ignore
  Env = ServerEnvSchema.parse(ServerEnvObj)
} else {
  // @ts-ignore
  Env = ClientEnvSchema.parse(ClientEnvObj)
}

export default Env
