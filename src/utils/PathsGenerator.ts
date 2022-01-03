import { Category } from 'common/interface/Constants'

const generateCategoryForLocale = ({
  locale,
  categories,
}: {
  locale: string
  categories: Category[]
}) => categories.map((category) => ({ params: { category }, locale }))

const generateCategoryPaths = ({
  locales,
  categories,
}: {
  locales: string[]
  categories: Category[]
}) =>
  locales
    .map((locale) => generateCategoryForLocale({ locale, categories }))
    .flat()

export { generateCategoryPaths, generateCategoryForLocale }
