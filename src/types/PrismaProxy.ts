// needed because Prisma optional fields are nullish but I want those to
// be undefined

import { GalleryImage as PrismaGalleryImage } from '@prisma/client'
import { NonNullable } from 'ts-toolbelt/out/Object/NonNullable'
import { NullableKeys } from 'ts-toolbelt/out/Object/NullableKeys'

type NullToUndefined<T extends Record<string, any>> = Omit<T, NullableKeys<T>> &
  Partial<NonNullable<Pick<T, NullableKeys<T>>>>

export type GalleryImage = NullToUndefined<PrismaGalleryImage>

type x = GalleryImage['isForSell']
