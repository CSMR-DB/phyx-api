import { csgoCostValidator } from './csgoCostValidator'
import { resultHandler, IResultHandler } from '~src/utils/resultHandler'
import csgoStrategyValid from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import csgoStrategyInvalidCost from '~src/features/csgo/mocks/csgoStrategyInvalidCost.mock'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { gameDataManager, IGameDataManager } from '~src/services/gameDataManager'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'

describe('cost-validator-class', () => {
  const csgoDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem> = gameDataManager<ICSGOItem, keyof ICSGOItem>(
    CSGOFACTORY.getItems()
  )

  const resultHandlerDef: IResultHandler<boolean> = resultHandler<boolean>({
    true: () => true,
    false: () => {
      throw new Error(`Strategy is not within budget`)
    }
  })

  test('should be within budget and return true', async () => {
    await expect(csgoCostValidator(csgoStrategyValid, csgoDataManager).execute()).resolves.toEqual({ errors: [], result: true })
  })

  test('should be within budget and return true', async () => {
    await expect(csgoCostValidator(csgoStrategyInvalidCost, csgoDataManager).execute()).resolves.toEqual({
      errors: [ Error('Cookie has spent too much on their loadout') ],
      result: false
    })
  })
})
