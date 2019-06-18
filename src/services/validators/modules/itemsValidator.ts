import { IGameDataManager } from '~src/services/gameDataManager'
import { IValidator } from '../IValidator.interface'
import { IGameItem } from '~src/interfaces/IStrategy.interface'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { isValidated } from './isValidated'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

export function itemsValidator<T extends IGameItem>(
  gameDataManager: IGameDataManager<T>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<ValidatorReturnType> {
    const uniqueIDs: IGameItem['internal_id'][] =
      strategyDataTransposer.uniqueIDs

    const errors: Error[] = []

    const results: boolean[] = uniqueIDs.map((id: IGameItem['internal_id']) => {
      const result: boolean = gameDataManager.hasID(id)

      if (!result) {
        errors.push(new Error(`${id} does not exist`))
      }

      return result
    })

    return await { result: isValidated(results), errors }
  }

  return Object.freeze({ execute })
}
