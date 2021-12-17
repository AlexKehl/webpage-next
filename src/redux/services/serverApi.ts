import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints } from '../../../common/constants/Endpoints'
import { User } from '../../../common/interface/ConsumerResponses'
import { API } from '../../constants/EnvProxy'
//@ts-ignore
import fetch from 'node-fetch'
import { ContactInformationDto } from '../../../common/interface/Dto'

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API, fetchFn: fetch }),
  endpoints: (builder) => ({
    user: builder.query<User, string>({
      query: (email: string) => ({
        url: Endpoints.user,
        method: 'GET',
        params: { email },
        credentials: 'include',
      }),
    }),
    contactInformation: builder.mutation<unknown, ContactInformationDto>({
      query: (body) => ({
        url: Endpoints.contactInformation,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
})

export const { useUserQuery, useContactInformationMutation } = serverApi
