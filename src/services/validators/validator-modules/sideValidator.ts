import { IStrategy } from '~src/interfaces/IStrategy.interface'
import { IStrategyDataTransposer } from '~src/services/validators/validator-modules/IStrategyDataTransposer.interface'
import { IValidator } from '../IValidator.interface'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { IGameDataManager } from '~src/services/gameDataManager'

export function sideValidator(
  strategy: IStrategy,
  gameDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] | [] }> {
    const stratSide: string = strategy.side

    const errors: Error[] = []

    const sides: ('ATK' | 'DEF')[] = []

    strategyDataTransposer.uniqueIDs.map((id: string) => {
      const item: ICSGOItem | undefined = gameDataManager.getOneById(id)

      const itemSide: string | undefined =
        item !== undefined ? item.side : undefined

      if (itemSide !== stratSide && itemSide !== 'UNI') {
        errors.push(new Error(`${id} is not equippable on ${stratSide} side`))
      }

      if (itemSide === 'ATK' || itemSide === 'DEF') {
        sides.push(itemSide)
      }
    })

    const uniqueSides: string[] = Array.from(new Set(sides))

    const sideSet: Set<string> = new Set([ ...uniqueSides, strategy.side ])

    const result: boolean = sideSet.size <= 1

    return await { result, errors }
  }

  return Object.freeze({ strategy, execute })
}
