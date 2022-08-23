import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints, staticEndPointPart } from 'common/constants/Endpoints'
import {
  GalleryImagePaymentResponse,
  LoginResponse,
  User,
} from 'common/interface/ConsumerResponses'
import {
  AddressInformationDto,
  BuyImageDto,
  ContactInformationDto,
  DeleteGalleryImageDto,
  GalleryImageDto,
  LoginDto,
  RegisterDto,
} from 'common/interface/Dto'
import { API } from 'src/constants/EnvProxy'
import { FileWithMeta } from 'src/features/gallery/types'
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
    checkout: builder.mutation<GalleryImagePaymentResponse, BuyImageDto>({
      query: (body) => ({
        url: Endpoints.checkout,
        method: 'POST',
        body,
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
    login: builder.query<LoginResponse, LoginDto>({
      query: (body) => ({
        url: Endpoints.login,
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),
    register: builder.mutation<unknown, RegisterDto>({
      query: (body) => ({
        url: Endpoints.register,
        method: 'POST',
        credentials: 'include',
        body,
      }),
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
  useLazyLoginQuery,
  useRegisterMutation,
} = serverApi
