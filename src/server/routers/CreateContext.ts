import { inferAsyncReturnType } from '@trpc/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

async function getUserFromRequest(req: NextApiRequest) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return null
  }
  return session.user
}

interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {}
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const user = await getUserFromRequest(req)

  return { req, res, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
