import { inferAsyncReturnType } from '@trpc/server'
import prisma from 'src/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

async function getUserFromRequest(req: NextApiRequest) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return null
  }
  return session.user
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const user = await getUserFromRequest(req)

  return { req, res, prisma, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
