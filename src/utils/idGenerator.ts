export interface IIDGenerator {
  (
    input: string,
    options?: Partial<{
      uppercase: boolean
      prefix: string
    }>
  ): string
}

export const idGenerator: IIDGenerator = (
  input: string,
  options?: Partial<{
    uppercase: boolean
    prefix: string
  }>
) => {
  let id: string = input.replace(/\W/g, '')

  if (options && options.uppercase) {
    id = id.toUpperCase()
  }

  if (options && options.prefix) {
    id = options.prefix + id
  }

  return id
}
