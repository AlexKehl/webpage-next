const tryCatch = async <T extends Error, U>(
  fn: () => Promise<U>
): Promise<[T, null] | [null, U]> => {
  try {
    const res = await fn()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

const setArrayValImmutable = <T>(arr: T[], idx: number, val: any): T[] => {
  const arrCopy = [...arr]
  arrCopy[idx] = val
  return arrCopy
}

export { tryCatch, setArrayValImmutable }
