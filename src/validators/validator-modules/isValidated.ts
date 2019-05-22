export function isValidated(results: boolean[]): boolean {
  return !(results.indexOf(false) !== -1)
}
