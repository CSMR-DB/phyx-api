import { itemsValidator } from './itemsValidator'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidItems } from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { csgoItems } from '~src/features/csgo/data/csgoItems'

describe('ItemsValidator', () => {
  const csgoDataManager: IGameDataManager<
    ICSGODocuments.Item
  > = gameDataManager<ICSGODocuments.Item>(csgoItems)

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
