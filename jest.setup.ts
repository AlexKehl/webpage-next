// jest.setup.ts
import { fetch, Headers, Request, Response } from 'cross-fetch'

process.env['DATABASE_URL'] = 'postgresql://prisma:prisma@localhost:5433/tests'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response
