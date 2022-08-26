import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints } from 'common/constants/Endpoints'
import { GalleryImagePaymentResponse } from 'common/interface/ConsumerResponses'
import {
  AddressInformationDto,
  BuyImageDto,
  ContactInformationDto,
} from 'common/interface/Dto'
import Env from 'src/constants/EnvProxy'

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Env.NEXT_PUBLIC_API,
    fetchFn: fetch,
  }),
  tagTypes: ['GalleryImages'],
  endpoints: (builder) => ({
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
    checkout: builder.mutation<GalleryImagePaymentResponse, BuyImageDto>({
      query: (body) => ({
        url: Endpoints.checkout,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useContactInformationMutation,
  useAddressInformationMutation,
  useCheckoutMutation,
} = serverApi
