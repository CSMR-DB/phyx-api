import { itemsValidator } from './itemsValidator'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidItems } from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'

describe('ItemsValidator', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOStrategyDocument.Item
  > = gameDataManager<ICSGOStrategyDocument.Item>(CSGOFACTORY.getItems())

  test('validates reduced items, valid', async () => {
    await expect(
      itemsValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })

  test('validates reduced items, invalid', async () => {
    await expect(
      itemsValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyInvalidItems)
      ).execute()
    ).resolves.toEqual({
      result: false,
      errors: [ Error('GLOCKZZZZ18 does not exist') ]
    })
  })

  test('validates reduced items, valid', async () => {
    await expect(
      itemsValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
