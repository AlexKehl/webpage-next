import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { Context, createContext } from 'src/server/routers/CreateContext'
import { galleryImageRouter } from 'src/server/routers/GalleryImageRouter'
import { postsRouter } from 'src/server/routers/PostsRouter'
import { s3Router } from 'src/server/routers/S3Router'

export const appRouter = trpc
  .router<Context>()
  .merge('posts.', postsRouter)
  .merge('gallery.', galleryImageRouter)
  .merge('s3.', s3Router)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
