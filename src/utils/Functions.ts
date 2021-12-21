import { ChangeEvent } from 'react'

export const getEventValue = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.type === 'checkbox') {
    return e.target.checked
  }
  if (e.target.type === 'number') {
    return e.target.valueAsNumber
  }
  return e.target.value
}

export const capitalize = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

export const getCyclic = <T>(arr: T[], idx: number): T => {
  if (idx < 0) {
    return getCyclic(arr, idx + arr.length)
  }
  if (idx > arr.length - 1) {
    return arr[(idx + 1) % arr.length]!
  }
  return arr[idx]!
}
