import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints } from '../../../common/constants/Endpoints'
import { User } from '../../../common/interface/ConsumerResponses'
import { API } from '../../constants/EnvProxy'

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    userInfo: builder.query<User, string>({
      query: (email: string) => ({
        url: Endpoints.user,
        method: 'GET',
        params: { email },
        credentials: 'include',
      }),
    }),
  }),
})

export const { useUserInfoQuery } = serverApi
