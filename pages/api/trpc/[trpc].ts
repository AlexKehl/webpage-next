import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { cartRouter } from 'src/server/routers/CartRouter'
import { Context, createContext } from 'src/server/routers/CreateContext'
import { galleryImageRouter } from 'src/server/routers/GalleryImageRouter'
import { s3Router } from 'src/server/routers/S3Router'

export const appRouter = trpc
  .router<Context>()
  .merge('gallery.', galleryImageRouter)
  .merge('s3.', s3Router)
  .merge('cart.', cartRouter)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
