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

export type Role = 'Admin' | 'RegisteredUser'

export interface User {
  email: string
  roles: Role[]
}

export interface BlobWithMeta {
  blob: Blob
  name: string
}

export type Category = 'acryl' | 'oil'

export type HOC = <T>(component: FC<T>) => FC<T>
