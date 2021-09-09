import { useRouter } from 'next/router'
import en from '../../locales/en'
import de from '../../locales/de'
import ru from '../../locales/ru'
import { Language } from '../../../common/constants/Languages'

const getTranslated = (locale?: Language) => {
  switch (locale) {
    case 'en':
      return en
    case 'de':
      return de
    case 'ru':
      return ru
    default:
      return en
  }
}

const useI18n = () => {
  const router = useRouter()

  const { locale, pathname, asPath } = router

  const changeLanguage = (locale: Language) => {
    router.push(pathname, asPath, { locale })
  }

  return {
    locale,
    changeLanguage,
    t: getTranslated(locale as Language),
  }
}

export default useI18n
