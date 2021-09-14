import _ from 'lodash'
import { User } from '../../../common/interface/ConsumerResponses'
import { ValueOf } from '../../../common/types'

interface LocalStorageData {
  user?: User
}

export const getItem = (
  key: keyof LocalStorageData
): ValueOf<LocalStorageData> => {
  if (typeof window === 'undefined') {
    return undefined
  }
  const item = localStorage.getItem(key)
  try {
    if (!item) {
      return undefined
    }
    return JSON.parse(item) as ValueOf<LocalStorageData>
  } catch (e) {
    return item as unknown as ValueOf<LocalStorageData>
  }
}

export const setItem = (
  key: keyof LocalStorageData,
  value: ValueOf<LocalStorageData>
) => {
  if (_.isObject(value)) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  // return localStorage.setItem(key, value!)
}
