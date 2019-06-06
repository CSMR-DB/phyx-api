import IStrategy from '~src/interfaces/IStrategy.interface'
import { IGameDataManager } from '~src/services/gameDataManager'
import {
  ISiegeStrategy,
  ISiegeOperator
} from '~src/features/siege/ISiegeStrategyModel.interface'
import { ISiegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'
import { R6SIEGE } from '../data/r6siege.factory'
import { IValidator } from '~src/services/validators/IValidator.interface'

export function siegeOperatorValidator(
  // strategy: ISiegeStrategy,
  gameDataManager: IGameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>,
  strategyDataTransposer: ISiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<boolean> {
    const {
      uniqueOperatorIDs
    }: {
      uniqueOperatorIDs: () => ISiegeOperator['internal_id'][]
    } = strategyDataTransposer
    const {
      operators
    }: { operators: () => ISiegeOperator[] } = strategyDataTransposer
    const results: boolean[] = []

    uniqueOperatorIDs().map((id: string) => {
      const operatorData:
        | R6SIEGE.IOperator
        | undefined = gameDataManager.getOneById(id)
      const {
        primaries: primariesData,
        secondaries: secondariesData,
        utilities: utilitiesData,
        gadget: gadgetData
      }: {
        primaries: R6SIEGE.IOperator['primaries']
        secondaries: R6SIEGE.IOperator['secondaries']
        utilities: R6SIEGE.IOperator['utilities']
        gadget: R6SIEGE.IOperator['gadget']
      } = operatorData!

      const operatorSubmitted: ISiegeOperator | undefined = operators().find(
        (operator: ISiegeOperator) => operator.internal_id === id
      )

      const {
        primary: { internal_id: primaryID },
        secondary: { internal_id: secondaryID },
        utility: { internal_id: utilityID },
        gadget: { internal_id: gadgetID }
      }: {
        primary: { internal_id: ISiegeOperator['primary']['internal_id'] }
        secondary: { internal_id: ISiegeOperator['secondary']['internal_id'] }
        utility: { internal_id: ISiegeOperator['utility']['internal_id'] }
        gadget: { internal_id: ISiegeOperator['gadget']['internal_id'] }
      } = operatorSubmitted!

      // Operator optionally has an ability and can therefor not be destructured in te same way
      if (operatorSubmitted!.ability !== undefined) {
        console.log(operatorSubmitted!.ability)
      }

      const isPrimaryValid: boolean =
        primaryID.length > 0 && primariesData.indexOf(primaryID) !== -1
      const isSecondaryValid: boolean =
        secondaryID.length > 0 && secondariesData.indexOf(secondaryID) !== -1
      const isUtilityValid: boolean =
        utilityID.length > 0 && utilitiesData.indexOf(utilityID) !== -1
      const isGadgetValid: boolean = gadgetData.internal_id === gadgetID

      results.push(
        isPrimaryValid,
        isSecondaryValid,
        isUtilityValid,
        isGadgetValid
      )
    })

    return await !(results.indexOf(false) > -1)
  }

  return Object.freeze({ execute })
}
