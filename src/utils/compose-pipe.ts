export const pipe: <T>(...fns: Function[]) => (val: T) => T = <T>(
  ...fns: Function[]
): ((val: T) => T) => (val: T): T =>
  fns.reduce((acc: T, fn: Function) => fn(acc), val)

export const compose: <T>(...fns: Function[]) => (val: T) => T = <T>(
  ...fns: Function[]
): ((val: T) => T) => (val: T): T =>
  fns.reduceRight((acc: T, fn: Function) => fn(acc), val)
