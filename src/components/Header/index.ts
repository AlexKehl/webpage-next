import { useRouter } from 'next/router'
import useI18n from '@/lib/hooks/useI18n'
import PComponent from '@/components/Header/PComponent'

const CComponent = () => {
  const router = useRouter()
  const { changeLanguage, i18n, locale } = useI18n()

  const props = { router, changeLanguage, i18n, locale }

  return <PComponent {...props} />
}

export default CComponent
