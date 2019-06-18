import { IValidator } from '../IValidator.interface'
import { IGameItem } from '~src/interfaces/IStrategy.interface'
import { IGameDataManager } from '~src/services/gameDataManager'
import { IStrategyDataTransposer } from './IStrategyDataTransposer.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

export function slotValidator<T extends IGameItem>(
  gameDataManager: IGameDataManager<T>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<ValidatorReturnType> {
    const itemsInSlots: {
      slot: string
      internal_id: string
    }[] = strategyDataTransposer.slots

    const errors: Error[] = []

    itemsInSlots.map((item: { slot: string; internal_id: string }) => {
      const dataItem: T | undefined = gameDataManager.getOneById(
        item.internal_id
      )

      if (dataItem) {
        if (dataItem.slot !== item.slot) {
          errors.push(
            Error(
              `${item.internal_id} is not equippable in the ${item.slot} slot`
            )
          )
        }
      }
    })
    const result: boolean = errors.length === 0

    return await {
      result,
      errors
    }
  }

  return Object.freeze({ execute })
}
