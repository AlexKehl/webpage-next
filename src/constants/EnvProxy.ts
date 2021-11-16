export const API = process.env['API']! || 'http://localhost:3002'
export const BASE_URL = process.env['BASE_URL']! || 'http://localhost:3000'
export const ENV = process.env['ENV']! || 'production'
export const PUBLIC_API_MOCKING_ENABLED = process.env[
  'PUBLIC_API_MOCKING_ENABLED'
] as unknown as boolean
