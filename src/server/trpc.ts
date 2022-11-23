import { Context } from 'src/server/routers/CreateContext'

import { initTRPC } from '@trpc/server'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

export const t = initTRPC.context<Context>().create()
// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const mergeRouters = t.mergeRouters
export const middleware = t.middleware
