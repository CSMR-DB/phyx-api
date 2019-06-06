import { IResultHandler } from '~src/utils/resultHandler'
import { IGameDataManager } from '~src/services/gameDataManager'
import { IValidator } from '../IValidator.interface'
import IStrategy, { IGameItem } from '~src/interfaces/IStrategy.interface'
import { IStrategyDataTransposer } from '~src/validators/validator-modules/IStrategyDataTransposer.interface'
import { isValidated } from './isValidated'

interface IItemsValidator {
  readonly gameDataManager: IGameDataManager<IGameItem, keyof IGameItem>
  readonly strategyDataTransposer: IStrategyDataTransposer
}

export function itemsValidator(
  strategy: IStrategy,
  gameDataManager: IGameDataManager<IGameItem, keyof IGameItem>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] }> {
    const uniqueIDs: IGameItem['internal_id'][] = strategyDataTransposer.uniqueIDs

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

  return Object.freeze({ strategy, execute })
}
