import { createSlice } from '@reduxjs/toolkit'
import HttpStatus from '../../../common/constants/HttpStatus'
import { User } from '../../../common/interface/ConsumerResponses'
import { getItem } from '../../lib/utils/LocalStorage'
import { serverApi } from '../services/serverApi'
import { RootState } from '../store'
import {
  addLoadingMatcher,
  toastByError,
  withLoader,
  WithLoader,
  WithRedirect,
  WithToast,
} from '../utils'

export interface UserState extends WithLoader, WithToast, WithRedirect {
  user?: User
}

export const initialState: UserState = {
  ...withLoader,
  user: getItem('user'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined
      state.redirectUrl = '/login'
      state.toast = { text: 'successFullLogout', type: 'success' }
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<UserState>(builder, serverApi.endpoints.login)
    builder.addMatcher(
      serverApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
        state.toast = { text: 'successFullLogin', type: 'success' }
        state.redirectUrl = '/'
      }
    )
    builder.addMatcher(
      serverApi.endpoints.login.matchRejected,
      toastByError<UserState>({
        [HttpStatus.UNAUTHORIZED]: 'wrongCredentials',
        [HttpStatus.NOT_FOUND]: 'userNotRegistered',
        default: 'unexpectedError',
      })
    )
    builder.addMatcher(
      serverApi.endpoints.register.matchRejected,
      toastByError<UserState>({
        [HttpStatus.CONFLICT]: 'emailAlreadyTaken',
        default: 'unexpectedError',
      })
    )
  },
})

export const userSelector = (state: RootState) => state.user
export const isLoggedIn = (state: UserState) => Boolean(state.user)
export const userActions = userSlice.actions
export default userSlice.reducer
