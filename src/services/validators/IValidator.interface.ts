import { IResultHandler } from '~src/utils/resultHandler'

export interface IValidator {
  readonly resultHandler?: IResultHandler<any>

  execute: () => Promise<{ result: boolean; errors: Error[] }>
}
