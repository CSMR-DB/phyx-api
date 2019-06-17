import { ICSGOStrategyDocument } from '../../interfaces/ICSGOStrategyDocument.interface'
import { strategyValidator } from '~src/services/validators/strategyValidator'
import { itemsValidator } from '~src/services/validators/modules/itemsValidator'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoCostValidator } from '../modules/csgoCostValidator'
import { sideValidator } from '~src/services/validators/modules/sideValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { slotValidator } from '~src/services/validators/modules/slotValidator'

export const csgoStrategyValidator: (
  strategy: ICSGOStrategyDocument.Strategy
) => Promise<ValidatorReturnType> = async (
  strategy: ICSGOStrategyDocument.Strategy
): Promise<ValidatorReturnType> => {
  const dataManager: IGameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  > = gameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  >(CSGOFACTORY.getItems())

  const dataReducer: IStrategyDataTransposer & {
    slots: {
      internal_id: string
      slot: string
    }[]
  } = csgoStrategyDataTransposer(strategy)

  try {
    return await strategyValidator(
      itemsValidator(strategy, dataManager, dataReducer),
      csgoCostValidator(strategy, dataManager),
      sideValidator(strategy, dataManager, dataReducer),
      slotValidator(strategy, dataManager, dataReducer)
    ).execute()
  } catch (e) {
    return { result: false, errors: [ e ] }
  }
}
