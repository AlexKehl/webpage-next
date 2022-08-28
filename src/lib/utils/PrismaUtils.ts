import { isNil } from 'remeda'

export const filterNullValues = <T extends Record<string, any>>(val: T) => {
  return Object.fromEntries(
    Object.entries(val).filter(([_, val]) => {
      return !isNil(val)
    })
  ) as T
}
