export function mapSpecificKey<T, K extends keyof T>(arr: T[], key: K): (T[K] | null)[] {
  function existFn(arg: any): boolean {
    return arg !== undefined && arg && arg.length > 0
  }

  const itemArr: (T[K] | null)[] = existFn(arr) ? arr.map((item: T) => item[key] || null) : []

  const result: (T[K] | null)[] = itemArr.filter((item: T[K] | null) => item !== null)

  return result
}
