export function objectToArray<T extends { [key: string]: any }>(
  object: T
): T[keyof T][] {
  return Object.keys(object).map((key: string) => object[key])
}
