import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { ValueOf } from '../../common/types'
import en from '../locales/en'
import { serverApi } from './services/serverApi'

export interface WithLoader {
  isLoading: boolean
}
export const withLoader = {
  isLoading: false,
}

export interface WithToast {
  toast?: {
    text: keyof typeof en
    type: 'error' | 'success'
  }
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

export interface WithRedirect {
  redirectUrl?: string
}
