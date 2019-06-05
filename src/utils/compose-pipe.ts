export const pipe: <T>(...fns: ((v: T) => T)[]) => (val: T) => T = <T>(
  ...fns: ((v: T) => T)[]
): ((val: T) => T) => (val: T): T =>
  fns.reduce((acc: T, fn: (v: T) => T) => fn(acc), val)

export const compose: <T>(...fns: ((v: T) => T)[]) => (val: T) => T = <T>(
  ...fns: ((v: T) => T)[]
): ((val: T) => T) => (val: T): T =>
  fns.reduceRight((acc: T, fn: (v: T) => T) => fn(acc), val)
