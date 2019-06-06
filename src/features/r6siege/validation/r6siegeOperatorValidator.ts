import { IGameDataManager } from '~src/services/gameDataManager'
import { IR6SiegeOperator } from '~src/features/r6siege/IR6SiegeStrategyModel.interface'
import { IR6SiegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'
import { R6SIEGE } from '../data/r6siege.factory'
import { IValidator } from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/validator-modules/isValidated'

export function siegeOperatorValidator(
  gameDataManager: IGameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>,
  strategyDataTransposer: IR6SiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] }> {
    const {
      uniqueOperatorIDs
    }: {
      uniqueOperatorIDs: IR6SiegeOperator['internal_id'][]
    } = strategyDataTransposer
    const {
      operators
    }: { operators: IR6SiegeOperator[] } = strategyDataTransposer

    const results: boolean[] = []

    const errors: Error[] = []

    uniqueOperatorIDs.map((id: string) => {
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

      const operatorSubmitted: IR6SiegeOperator | undefined = operators.find(
        (operator: IR6SiegeOperator) => operator.internal_id === id
      )

      const {
        primary: { internal_id: primaryID },
        secondary: { internal_id: secondaryID },
        utility: { internal_id: utilityID },
        gadget: { internal_id: gadgetID }
      }: {
        primary: { internal_id: IR6SiegeOperator['primary']['internal_id'] }
        secondary: { internal_id: IR6SiegeOperator['secondary']['internal_id'] }
        utility: { internal_id: IR6SiegeOperator['utility']['internal_id'] }
        gadget: { internal_id: IR6SiegeOperator['gadget']['internal_id'] }
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

      const invalidItems: string[] = []

      !isPrimaryValid && invalidItems.push(primaryID)
      !isSecondaryValid && invalidItems.push(secondaryID)
      !isUtilityValid && invalidItems.push(utilityID)
      !isGadgetValid && invalidItems.push(gadgetID)

      if (
        !isPrimaryValid ||
        !isSecondaryValid ||
        !isUtilityValid ||
        !isGadgetValid
      )
        errors.push(
          Error(
            `${operatorSubmitted!.internal_id} is invalid: ${invalidItems.join(
              ', '
            )}`
          )
        )
    })

    return await { result: isValidated(results), errors }
  }

  return Object.freeze({ execute })
}
