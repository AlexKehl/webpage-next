import {
  generateCategoryForLocale,
  generateCategoryPaths,
} from '../../src/utils/PathsGenerator'

describe('generateCategoryForLocale', () => {
  it('generates category permutations for one locale', () => {
    const input = {
      locale: 'en',
      categories: ['acryl', 'oil'],
    }

    const res = generateCategoryForLocale(input)

    const expected = [
      { params: { category: 'acryl' }, locale: 'en' },
      { params: { category: 'oil' }, locale: 'en' },
    ]

    expect(res).toEqual(expected)
  })
})

describe('generatePaths', () => {
  it('generates paths from locales and categories', () => {
    const input = {
      locales: ['en', 'de'],
      categories: ['acryl', 'oil'],
    }

    const res = generateCategoryPaths(input)

    const expected = [
      { params: { category: 'acryl' }, locale: 'en' },
      { params: { category: 'oil' }, locale: 'en' },
      { params: { category: 'acryl' }, locale: 'de' },
      { params: { category: 'oil' }, locale: 'de' },
    ]

    expect(res).toEqual(expected)
  })

  it('generates paths from different locals and categories', () => {
    const input = {
      locales: ['en', 'ru'],
      categories: ['acryl', 'Airbrush'],
    }

    const res = generateCategoryPaths(input)

    const expected = [
      { params: { category: 'acryl' }, locale: 'en' },
      { params: { category: 'Airbrush' }, locale: 'en' },
      { params: { category: 'acryl' }, locale: 'ru' },
      { params: { category: 'Airbrush' }, locale: 'ru' },
    ]

    expect(res).toEqual(expected)
  })
})
