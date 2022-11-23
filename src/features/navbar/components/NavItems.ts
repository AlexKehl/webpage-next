import useI18n from 'src/lib/hooks/useI18n'
import { Languages, Categories } from 'src/constants'

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  onClick?: () => void
}

export const getNavItems = ({
  t,
  router,
  locale,
  changeLanguage,
}: ReturnType<typeof useI18n>): NavItem[] => {
  return [
    {
      label: t.about,
      onClick: () => router.push('/about'),
    },
    {
      label: locale?.toUpperCase() || '',
      children: Languages.map((lang) => {
        return {
          label: lang.toUpperCase(),
          onClick: () => changeLanguage(lang),
        }
      }),
    },
    {
      label: t.gallery,
      children: Categories.map((category) => {
        return {
          label: t[category],
          onClick: () => router.push(`/gallery/${category}`),
        }
      }),
    },
  ]
}
