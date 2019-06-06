import { R6SIEGE } from '../data/r6siege.factory'
import { ISiegeOperator } from '~src/features/siege/IR6SiegeStrategyModel.interface'
import { IGameDataManager } from '../../../services/gameDataManager'
import { ISiegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'
import { IValidator } from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/validator-modules/isValidated'

export function siegeGadgetValidator(
  // strategy: ISiegeStrategy,
  gameDataManager: IGameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>,
  strategyDataTransposer: ISiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] }> {
    const {
      operators
    }: { operators: ISiegeOperator[] } = strategyDataTransposer

    const results: boolean[] = []

    const errors: Error[] = []

    operators.map((operator: ISiegeOperator) => {
      const operatorData:
        | R6SIEGE.IOperator
        | undefined = gameDataManager.getOneById(operator.internal_id)
      const hasValidGadget: boolean =
        operator.gadget.deployed_at.length <= operatorData!.gadget.count

      results.push(hasValidGadget)

      if (!hasValidGadget)
        errors.push(Error(`${operatorData!.gadget} is not valid`))
    })

    return await { result: isValidated(results), errors }
  }

  return Object.freeze({ execute })
}
