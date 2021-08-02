import { FC } from 'react'

export interface Photo {
  url: string
  width?: number
  height?: number
}

export interface Credentials {
  email: string
  password: string
}

export interface User {
  email: string
}

export interface BlobWithMeta {
  blob: Blob
  name: string
}

export type HOC = <T>(component: FC<T>) => FC<T>
