import { useRouter } from 'next/router'
import React, { FC } from 'react'
import useI18n from '../../lib/hooks/useI18n'
import PComponent from './PComponent'

const CComponent: FC = () => {
  const router = useRouter()
  const { changeLanguage, i18n, locale } = useI18n()

  const props = { router, changeLanguage, i18n, locale }

  return <PComponent {...props} />
}

export default CComponent
