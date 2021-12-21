import { getCyclic } from '../../src/utils/Functions'
import cases from 'jest-in-case'

describe('getCyclic', () => {
  const testArr = [1, 2, 3, 4, 5]
  cases(
    'getNextCyclic(arr, idx)',
    (opts) => {
      expect(getCyclic(testArr, opts.idx)).toBe(opts.result)
    },
    [
      { name: 'idx: 1, result: 2', idx: 1, result: 2 },
      { name: 'idx: 5, result: 2', idx: 5, result: 2 },
      { name: 'idx: 6, result: 3', idx: 6, result: 3 },
      { name: 'idx: 9, result: 1', idx: 9, result: 1 },
      { name: 'idx: -1, result: 5', idx: -1, result: 5 },
      { name: 'idx: -2, result: 4', idx: -2, result: 4 },
      { name: 'idx: -5, result: 1', idx: -5, result: 1 },
      { name: 'idx: -6, result: 5', idx: -6, result: 5 },
      { name: 'idx: -12, result: 4', idx: -12, result: 4 },
    ]
  )
})
