import { FC } from 'react'
import { Dto } from '../../common/interface/Dto'

export type HOC = <T>(component: FC<T>) => FC<T>

export interface PostParams extends RequestInit {
  url: string
  data?: Dto
}

export type Language = 'en' | 'de' | 'ru'

export * from './Cart'
