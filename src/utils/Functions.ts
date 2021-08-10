import { ChangeEvent } from 'react'

const getEventValue = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.type === 'checkbox') {
    return e.target.checked
  }
  if (e.target.type === 'number') {
    return e.target.valueAsNumber
  }
  return e.target.value
}

export { getEventValue }
