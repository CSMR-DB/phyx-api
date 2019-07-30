export type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] }

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
