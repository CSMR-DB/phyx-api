import { IGameDataManager } from '~src/services/gameDataManager'
import { IR6SiegeOperator } from '~src/features/r6siege/IR6SiegeStrategyModel.interface'
import { IR6SiegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'
import { R6SIEGE } from '../data/r6siege.factory'
import { IValidator } from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'

export function siegeOperatorValidator(
  gameDataManager: IGameDataManager<R6SIEGE.IOperator>,
  strategyDataTransposer: IR6SiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] }> {
    const {
      operators,
      uniqueOperatorIDs
    }: {
      operators: IR6SiegeOperator[]
      uniqueOperatorIDs: IR6SiegeOperator['internal_id'][]
    } = strategyDataTransposer

    const results: boolean[] = []
    const errors: Error[] = []

    uniqueOperatorIDs.map((id: string) => {
      const invalidItems: string[] = []

      const operatorData:
        | R6SIEGE.IOperator
        | undefined = gameDataManager.getOneById(id)

      if (operatorData) {
        const {
          primaries: primariesData,
          secondaries: secondariesData,
          utilities: utilitiesData,
          gadget: gadgetData,
          ability: abilityData
        }: R6SIEGE.IOperator = operatorData

        const operatorSubmitted: IR6SiegeOperator | undefined = operators.find(
          (operator: IR6SiegeOperator) => operator.internal_id === id
        )

        if (operatorSubmitted) {
          const {
            primary: { internal_id: primaryID },
            secondary: { internal_id: secondaryID },
            utility: { internal_id: utilityID },
            gadget: { internal_id: gadgetID },
            ability
          }: IR6SiegeOperator = operatorSubmitted

          const itemsArray: [string[], string][] = [
            [ primariesData, primaryID ],
            [ secondariesData, secondaryID ],
            [ utilitiesData, utilityID ]
          ]

          // Validate items with a shape of string[]
          itemsArray.map(([ array, item ]: [string[], string]) => {
            const itemValid: boolean = array.indexOf(item) !== -1
            if (!itemValid) {
              invalidItems.push(item)
            }
            results.push(itemValid)
          })

          // Validate gadget with a shape of {name: string; internal_id: string; deployable: boolean; count: number;}
          if (gadgetID && gadgetData) {
            const gadgetValid: boolean = gadgetData.internal_id === gadgetID
            if (!gadgetValid) {
              invalidItems.push(gadgetID)
            }
            results.push(gadgetValid)
          }

          // Validate ability with a shape of Optional<{name: string: internal_id: string}>
          if (ability) {
            const abilityValid: boolean = abilityData
              ? ability.internal_id === abilityData.internal_id
              : false
            if (!abilityValid) {
              invalidItems.push(ability.internal_id)
            }
            results.push(abilityValid)
          }

          if (invalidItems.length > 0)
            errors.push(
              Error(
                `${
                  operatorSubmitted.internal_id
                } is invalid: ${invalidItems.join(', ')}`
              )
            )
        }
      }
    })

    return await { result: isValidated(results), errors }
  }

  return Object.freeze({ execute })
}
