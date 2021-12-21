import * as router from 'next/router'

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
