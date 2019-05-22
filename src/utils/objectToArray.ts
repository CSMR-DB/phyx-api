export function objectToArray(object: { [key: string]: any }): any[] {
  return Object.keys(object).map((key: string) => object[key])
}
