import IStrategy from '~src/interfaces/IStrategy.interface'
import { IResultHandler } from '~src/utils/resultHandler'

export interface IValidator {
  // readonly strategy: IStrategy
  readonly resultHandler?: IResultHandler<any>

  execute: () => Promise<{ result: boolean; errors: Error[] }>
}
