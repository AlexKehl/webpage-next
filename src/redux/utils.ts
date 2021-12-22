import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import HttpStatus from '../../common/constants/HttpStatus'
import { ValueOf } from '../../common/types'
import { LocalStorageData } from '../lib/utils/LocalStorage'
import en from '../locales/en'
import { serverApi } from './services/serverApi'

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
  redirectUrl?: string
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

export const addLoadingMatcher = <T extends WithLoader>(
  builder: ActionReducerMapBuilder<any>,
  matcher: ValueOf<typeof serverApi.endpoints>
) => {
  builder.addMatcher(matcher.matchRejected, (state: T) => {
    state.isLoading = false
  })
  builder.addMatcher(matcher.matchFulfilled, (state: T) => {
    state.isLoading = false
  })
  builder.addMatcher(matcher.matchPending, (state: T) => {
    state.isLoading = true
  })
}

export const addGenericToasts = <T extends WithToast>(
  builder: ActionReducerMapBuilder<any>,
  matcher: ValueOf<typeof serverApi.endpoints>
) => {
  builder.addMatcher(matcher.matchFulfilled, (state: T) => {
    state.toast = { text: 'successfullySubmitted', type: 'success' }
  })
  builder.addMatcher(matcher.matchRejected, (state) => {
    state.toast = { text: 'unexpectedError', type: 'error' }
  })
}

export const toastByError =
  <T extends WithToast>(
    handlers: Partial<Record<ValueOf<typeof HttpStatus>, keyof typeof en>> & {
      default: keyof typeof en
    }
  ) =>
  (state: T, action: PayloadAction<FetchBaseQueryError>) => {
    if (!handlers[action.payload.status as ValueOf<typeof HttpStatus>]) {
      return {
        ...state,
        toast: {
          type: 'error',
          text: handlers.default,
        },
      }
    }
    return {
      ...state,
      toast: {
        type: 'error',
        text: handlers[action.payload.status as ValueOf<typeof HttpStatus>],
      },
    }
  }
