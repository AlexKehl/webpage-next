import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints } from '../../../common/constants/Endpoints'
import {
  GalleryImagePaymentResponse,
  User,
} from '../../../common/interface/ConsumerResponses'
import { API } from '../../constants/EnvProxy'
//@ts-ignore
import fetch from 'node-fetch'
import {
  AddressInformationDto,
  ContactInformationDto,
} from '../../../common/interface/Dto'
import { Cart } from '../../types'

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
    addressInformation: builder.mutation<unknown, AddressInformationDto>({
      query: (body) => ({
        url: Endpoints.addressInformation,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    checkout: builder.mutation<GalleryImagePaymentResponse, Cart>({
      query: (cart) => ({
        url: Endpoints.checkout,
        method: 'POST',
        body: {
          ids: cart.items.map((i) => i.id),
        },
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useUserQuery,
  useContactInformationMutation,
  useAddressInformationMutation,
  useCheckoutMutation,
} = serverApi
