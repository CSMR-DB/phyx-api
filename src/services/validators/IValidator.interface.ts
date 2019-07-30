export type ValidatorReturnType = { result: boolean; errors: Error[] }

export interface IValidator {
  execute: () => Promise<{ result: boolean; errors: Error[] }>
}

export interface IValidatorWithStrategy<T> {
  execute: (strategy: T) => Promise<{ result: boolean; errors: Error[] }>
}
