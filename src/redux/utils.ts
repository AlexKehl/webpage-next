import { LocalStorageData } from '../lib/utils/LocalStorage'
import en from '../locales/en'

export interface WithLoader {
  hasLoader: boolean
  isLoading: boolean
}
export const withLoader: WithLoader = {
  hasLoader: true,
  isLoading: false,
}

export interface WithRedirect {
  hasRedirect: boolean
  redirect?: { url: string }
}

export const withRedirect: WithRedirect = {
  hasRedirect: true,
}

export interface WithToast {
  hasToasts: true
  toast?: {
    text: keyof typeof en
    type: 'error' | 'success'
  }
}

export const withToasts: WithToast = {
  hasToasts: true,
}

export interface WithLocalStorage<T extends keyof LocalStorageData> {
  hasLocalStorage: boolean
  localStorage?: {
    key: T
    value: LocalStorageData[T]
  }
}

export const withLocalStorage: WithLocalStorage<any> = {
  hasLocalStorage: true,
}
