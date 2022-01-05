import _ from 'lodash'
import { User } from 'common/interface/ConsumerResponses'
import { Cart } from 'src/features/cart/types'

export interface LocalStorageData {
  user?: User
  cart: Cart
}

export const getItem = <T extends keyof LocalStorageData>(
  key: T
): LocalStorageData[T] | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }
  const item = localStorage.getItem(key)
  try {
    if (!item) {
      return undefined
    }
    return JSON.parse(item) as LocalStorageData[T]
  } catch (e) {
    return item as unknown as LocalStorageData[T]
  }
}

export const deleteItem = (key: keyof LocalStorageData) => {
  localStorage.removeItem(key)
}

export const setItem = <T extends keyof LocalStorageData>(
  key: T,
  value: LocalStorageData[T]
) => {
  if (_.isObject(value)) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  return localStorage.setItem(key, value as any)
}
