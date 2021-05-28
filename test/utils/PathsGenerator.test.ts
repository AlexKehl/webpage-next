import {
  generateCategoryPaths,
  generateCategoryForLocale,
} from '@/utils/PathsGenerator'

describe('generateCategoryForLocale', () => {
  it('generates category permutations for one locale', () => {
    const input = {
      locale: 'en',
      categories: ['Acryl', 'Oil'],
    }

    const res = generateCategoryForLocale(input)

    const expected = [
      { params: { category: 'Acryl' }, locale: 'en' },
      { params: { category: 'Oil' }, locale: 'en' },
    ]

    expect(res).toEqual(expected)
  })
})

describe('generatePaths', () => {
  it('generates paths from locales and categories', () => {
    const input = {
      locales: ['en', 'de'],
      categories: ['Acryl', 'Oil'],
    }

    const res = generateCategoryPaths(input)

    const expected = [
      { params: { category: 'Acryl' }, locale: 'en' },
      { params: { category: 'Oil' }, locale: 'en' },
      { params: { category: 'Acryl' }, locale: 'de' },
      { params: { category: 'Oil' }, locale: 'de' },
    ]

    expect(res).toEqual(expected)
  })

  it('generates paths from different locals and categories', () => {
    const input = {
      locales: ['en', 'ru'],
      categories: ['Acryl', 'Airbrush'],
    }

    const res = generateCategoryPaths(input)

    const expected = [
      { params: { category: 'Acryl' }, locale: 'en' },
      { params: { category: 'Airbrush' }, locale: 'en' },
      { params: { category: 'Acryl' }, locale: 'ru' },
      { params: { category: 'Airbrush' }, locale: 'ru' },
    ]

    expect(res).toEqual(expected)
  })
})
