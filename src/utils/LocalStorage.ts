export const getObj = <T = any>(key: string): T => {
  if (typeof window === 'undefined') {
    return
  }
  return JSON.parse(localStorage.getItem(key))
}

export const setObj = (key: string, obj: Record<string, any>): void => {
  localStorage.setItem(key, JSON.stringify(obj))
}
