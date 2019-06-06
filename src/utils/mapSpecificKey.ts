export function mapSpecificKey<T>(
  arr: T[],
  key: keyof T,
  type?: string
): (T[keyof T] | null)[] {
  function existFn(arg: any): boolean {
    return arg !== undefined && arg && arg.length > 0
  }

  const itemArr: (T[keyof T] | null)[] = existFn(arr)
    ? arr.map((item: T) => item[key] || null)
    : []

  const validArr: (T[keyof T] | null)[] = itemArr.filter(
    (item: T[keyof T] | null) => {
      return type !== undefined ? typeof item === type : item
    }
  )

  const result: (T[keyof T] | null)[] = validArr.filter(
    (item: T[keyof T] | null) => item !== null
  )

  return result
}
