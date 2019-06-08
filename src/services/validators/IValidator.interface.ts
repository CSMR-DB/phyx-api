import { IResultHandler } from '~src/utils/resultHandler'

export type ValidatorReturnType = { result: boolean; errors: Error[] | [] }

export interface IValidator {
  readonly resultHandler?: IResultHandler<any>

  execute: () => Promise<{ result: boolean; errors: Error[] }>
}
