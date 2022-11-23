import NextAuth from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'
import Env from 'src/constants/EnvProxy'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from 'src/lib/prisma'
import { Role } from '@prisma/client'

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: Env.COGNITO_CLIENT_ID,
      clientSecret: Env.COGNITO_CLIENT_SECRET,
      issuer: Env.COGNITO_ISSUER,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      // @ts-ignore
      session.user.role = user['role'] as Role
      session.user.id = user['id']
      return session
    },
  },
})
