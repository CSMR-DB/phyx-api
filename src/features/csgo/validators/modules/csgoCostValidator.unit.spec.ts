import { csgoCostValidator } from './csgoCostValidator'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidCost } from '~src/features/csgo/mocks/csgoStrategyInvalidCost.mock'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'

describe('csgoCostValidator', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  > = gameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  >(CSGOFACTORY.getItems())

  test('should be within budget and return true', async () => {
    await expect(
      csgoCostValidator(csgoStrategyValid, csgoDataManager).execute()
    ).resolves.toEqual({ errors: [], result: true })
  })

  test('should be within budget and return true', async () => {
    await expect(
      csgoCostValidator(csgoStrategyInvalidCost, csgoDataManager).execute()
    ).resolves.toEqual({
      errors: [ Error('Cookie has spent too much on their loadout') ],
      result: false
    })
  })
})
