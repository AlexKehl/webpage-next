import { createSlice } from '@reduxjs/toolkit'
import HttpStatus from 'common/constants/HttpStatus'
import { User } from 'common/interface/ConsumerResponses'
import { getItem } from 'src/lib/utils/LocalStorage'
import { serverApi } from 'src/redux/services/serverApi'
import { RootState } from 'src/redux/store'
import {
  WithLoader,
  WithToast,
  WithRedirect,
  WithLocalStorage,
  withLocalStorage,
  withRedirect,
  withLoader,
  withToasts,
  addLoadingMatcher,
  toastByError,
} from 'src/redux/utils'

export interface UserState
  extends WithLoader,
    WithToast,
    WithRedirect,
    WithLocalStorage<'user'> {
  user?: User
}

export const initialState: UserState = {
  ...withLocalStorage,
  ...withRedirect,
  ...withLoader,
  ...withToasts,
  user: getItem('user'),
}

const login = serverApi.endpoints.login
const register = serverApi.endpoints.register

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined
      state.localStorage = { key: 'user', value: undefined }
      state.redirect = { url: '/login' }
      state.toast = { text: 'successFullLogout', type: 'success' }
    },
  },
  extraReducers: (builder) => {
    addLoadingMatcher<UserState>(builder, serverApi.endpoints.login)
    builder.addMatcher(login.matchFulfilled, (state, action) => {
      state.user = action.payload.user
      state.localStorage = { key: 'user', value: action.payload.user }
      state.toast = { text: 'successFullLogin', type: 'success' }
      state.redirect = { url: '/' }
    })
    builder.addMatcher(
      login.matchRejected,
      toastByError<UserState>({
        [HttpStatus.UNAUTHORIZED]: 'wrongCredentials',
        [HttpStatus.NOT_FOUND]: 'userNotRegistered',
        default: 'unexpectedError',
      })
    )
    builder.addMatcher(register.matchFulfilled, (state) => {
      state.redirect = { url: '/confirmemail' }
    })
    builder.addMatcher(
      register.matchRejected,
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
