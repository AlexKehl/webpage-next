export const joinClasses = (classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}
