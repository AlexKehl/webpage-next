import { router } from '../trpc'
import { cartRouter } from './CartRouter'
import { checkoutRouter } from './CheckoutRouter'
import { galleryImageRouter } from './GalleryImageRouter'
import { s3Router } from './S3Router'

export const appRouter = router({
  galleryImageRouter,
  cartRouter,
  s3Router,
  checkoutRouter,
})

export type AppRouter = typeof appRouter
