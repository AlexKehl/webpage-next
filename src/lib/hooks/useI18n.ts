import { useRouter } from 'next/router'
import { Language } from 'common/constants/Languages'
import de from 'src/locales/de'
import en from 'src/locales/en'
import ru from 'src/locales/ru'

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

export type I18n = ReturnType<typeof getTranslated>

const useI18n = () => {
  const router = useRouter()

  const { locale, pathname, asPath } = router

  const changeLanguage = (locale: Language) => {
    router.push(pathname, asPath, { locale })
  }

  return {
    router,
    locale,
    changeLanguage,
    t: getTranslated(locale as Language),
  }
}

export default useI18n
