const generateCategoryForLocale = ({ locale, categories }) =>
  categories.map((category) => ({ params: { category }, locale }))

const generateCategoryPaths = ({ locales, categories }) =>
  locales
    .map((locale) => generateCategoryForLocale({ locale, categories }))
    .flat()

export { generateCategoryPaths, generateCategoryForLocale }
