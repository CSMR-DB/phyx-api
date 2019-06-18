import { mapValidator } from './mapValidator'
import {
  IGameDataManager,
  gameDataManager
} from '~src/services/gameDataManager'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'

describe('mapValidator', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOStrategyDocument.Map
  > = gameDataManager<ICSGOStrategyDocument.Map>(CSGOFACTORY.getMaps())

  test('should validate existing maps', async () => {
    await expect(
      mapValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
