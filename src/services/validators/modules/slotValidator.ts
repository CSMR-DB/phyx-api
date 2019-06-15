import { IValidator } from '../IValidator.interface'
import { IStrategy } from '~src/interfaces/IStrategy.interface'
import { IGameDataManager } from '~src/services/gameDataManager'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { IStrategyDataTransposer } from './IStrategyDataTransposer.interface'

export function slotValidator(
  strategy: IStrategy,
  gameDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem>,
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
      const dataItem: ICSGOItem | undefined = gameDataManager.getOneById(
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
