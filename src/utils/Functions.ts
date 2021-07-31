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

export { tryCatch }
