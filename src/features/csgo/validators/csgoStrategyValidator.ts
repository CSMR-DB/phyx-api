import { ICSGOStrategy } from '../interfaces/ICSGOStrategy.interface'
import { strategyValidator } from '~src/services/validators/strategyValidator'
import { itemsValidator } from '~src/services/validators/modules/itemsValidator'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoCostValidator } from './modules/csgoCostValidator'
import { sideValidator } from '~src/services/validators/modules/sideValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { slotValidator } from '~src/services/validators/modules/slotValidator'

const dataManager: IGameDataManager<
  ICSGOItem,
  keyof ICSGOItem
> = gameDataManager<ICSGOItem, keyof ICSGOItem>(CSGOFACTORY.getItems())

const dataReducer: (strategy: ICSGOStrategy) => IStrategyDataTransposer = (
  strategy: ICSGOStrategy
): IStrategyDataTransposer => csgoStrategyDataTransposer(strategy)

export const csgoStrategyValidator: (
  strategy: ICSGOStrategy
) => Promise<ValidatorReturnType> = async (
  strategy: ICSGOStrategy
): Promise<ValidatorReturnType> => {
  try {
    return await strategyValidator([
      itemsValidator(strategy, dataManager, dataReducer(strategy)),
      csgoCostValidator(strategy, dataManager),
      sideValidator(strategy, dataManager, dataReducer(strategy)),
      slotValidator(strategy, dataManager, dataReducer(strategy))
    ]).execute()
  } catch (e) {
    return { result: false, errors: [ e ] }
  }
}
