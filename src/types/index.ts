import { FC } from 'react'

export type HOC = <T>(component: FC<T>) => FC<T>
