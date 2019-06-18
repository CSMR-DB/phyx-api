import { IGameItem } from '~src/interfaces/IStrategy.interface'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { IValidator } from '../IValidator.interface'
import { IGameDataManager } from '~src/services/gameDataManager'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

export function sideValidator<T extends IGameItem>(
  gameDataManager: IGameDataManager<T>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<ValidatorReturnType> {
    const stratSide: string = strategyDataTransposer.side

    const errors: Error[] = []

    const sides: ('ATK' | 'DEF')[] = []

    strategyDataTransposer.uniqueIDs.map((id: string) => {
      const item: T | undefined = gameDataManager.getOneById(id)

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

    const sideSet: Set<string> = new Set([ ...uniqueSides, stratSide ])

    const result: boolean = sideSet.size <= 1

    return await { result, errors }
  }

  return Object.freeze({ execute })
}
