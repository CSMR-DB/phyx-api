import { IGameDataManager } from '~src/services/gameDataManager'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { IValidator, ValidatorReturnType } from '../IValidator.interface'
import { IGameMap } from '~src/interfaces/IStrategy.interface'

export function mapValidator<T extends IGameMap>(
  gameDataManager: IGameDataManager<T>,
  strategyDataTransposer: IStrategyDataTransposer
): IValidator {
  async function execute(): Promise<ValidatorReturnType> {
    const errors: Error[] = []

    const mapName: string = strategyDataTransposer.map

    const mapExists: boolean = gameDataManager.hasID(
      mapName.toLocaleUpperCase()
    )

    if (!mapExists) {
      errors.push(Error(`${mapName} does not exist`))
    }

    return await { result: mapExists, errors }
  }

  return Object.freeze({ execute })
}
