import { IValidator } from '../IValidator.interface'
import { IStrategy, IGameItem } from '~src/interfaces/IStrategy.interface'
import { IGameDataManager } from '~src/services/gameDataManager'
import { IStrategyDataTransposer } from './IStrategyDataTransposer.interface'

export function slotValidator<T extends IGameItem, K extends keyof T>(
  strategy: IStrategy,
  gameDataManager: IGameDataManager<T, K>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{
    result: boolean
    errors: Error[] | []
  }> {
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

  return Object.freeze({ strategy, execute })
}
