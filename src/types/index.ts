import { FC } from 'react'

export type HOC = <T>(component: FC<T>) => FC<T>

export interface PostParams extends RequestInit {
  url: string
  data?: Record<string, any>
}
