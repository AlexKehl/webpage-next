import * as router from 'next/router'
import { createContextInner } from 'src/server/routers/CreateContext'
import prisma from 'src/lib/prisma'
import { appRouter } from 'pages/api/trpc/[trpc]'
import { User1 } from 'test/fixtures/User'

interface MockRouterOpts {
  query?: Record<string, string>
}
export const mockRouter = ({ query = {} }: MockRouterOpts = {}) => {
  // @ts-ignore
  router.useRouter = () => ({
    push: jest.fn(),
    locale: 'en',
    query,
    isReady: true,
  })
}

export const setupServer = () => {
  afterEach(async () => {
    await prisma.galleryImage.deleteMany()
    await prisma.user.deleteMany()
  })

  const getServerClient = async () => {
    const ctx = await createContextInner({})
    // @ts-ignore
    const caller = appRouter.createCaller({ user: User1 })
    return { ctx, caller }
  }

  return { getServerClient }
}
