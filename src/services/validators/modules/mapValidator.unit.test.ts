import { mapValidator } from './mapValidator'
import {
  IGameDataManager,
  gameDataManager
} from '~src/services/gameDataManager'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoMaps } from '~src/features/csgo/data/csgoMaps'

describe('mapValidator', () => {
  const csgoDataManager: IGameDataManager<ICSGODocuments.Map> = gameDataManager<
    ICSGODocuments.Map
  >(csgoMaps)

  test('should validate existing maps', async () => {
    await expect(
      mapValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
