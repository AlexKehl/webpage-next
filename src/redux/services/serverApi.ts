import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  Endpoints,
  staticEndPointPart,
} from '../../../common/constants/Endpoints'
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
  DeleteGalleryImageDto,
  GalleryImageDto,
} from '../../../common/interface/Dto'
import { Cart } from '../../types'
import { FileWithMeta } from '../../types/GalleryImages'
import { serializeFilesWithMeta } from './transformers/files'

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API, fetchFn: fetch }),
  tagTypes: ['GalleryImages'],
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
    images: builder.query<FileWithMeta[], string>({
      query: (category) => ({
        url: `${staticEndPointPart('galleryCategoryList')}${category}`,
        method: 'GET',
        credentials: 'include',
      }),
      transformResponse: serializeFilesWithMeta,
      providesTags: ['GalleryImages'],
    }),
    galleryUpload: builder.mutation<unknown, GalleryImageDto>({
      query: (body) => ({
        url: Endpoints.galleryUpload,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['GalleryImages'],
    }),
    galleryDelete: builder.mutation<unknown, DeleteGalleryImageDto>({
      query: (body) => ({
        url: Endpoints.galleryDelete,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['GalleryImages'],
    }),
  }),
})

export const {
  useUserQuery,
  useContactInformationMutation,
  useAddressInformationMutation,
  useCheckoutMutation,
  useImagesQuery,
  useGalleryUploadMutation,
  useGalleryDeleteMutation,
} = serverApi
