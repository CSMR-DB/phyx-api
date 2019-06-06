import { R6SIEGE } from '../data/r6siege.factory'
import {
  ISiegeStrategy,
  ISiegeOperator
} from '~src/features/siege/ISiegeStrategyModel.interface'
import { IGameDataManager } from '../../../services/gameDataManager'
import { ISiegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'
import { IValidator } from '~src/services/validators/IValidator.interface'
import { ISiegePlayer } from './../ISiegeStrategyModel.interface'

export function siegeGadgetValidator(
  // strategy: ISiegeStrategy,
  gameDataManager: IGameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>,
  strategyDataTransposer: ISiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<boolean> {
    const {
      operators
    }: { operators: () => ISiegeOperator[] } = strategyDataTransposer

    const results: boolean[] = []

    operators().map((operator: ISiegeOperator) => {
      const operatorData:
        | R6SIEGE.IOperator
        | undefined = gameDataManager.getOneById(operator.internal_id)
      const hasValidGadget: boolean =
        operator.gadget.deployed_at.length <= operatorData!.gadget.count

      results.push(hasValidGadget)
    })

    const result: boolean = !(results.indexOf(false) !== -1)

    return await result
  }

  return Object.freeze({ execute })
}
