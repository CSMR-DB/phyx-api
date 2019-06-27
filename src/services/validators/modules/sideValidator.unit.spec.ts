import { sideValidator } from './sideValidator'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidSide } from '~src/features/csgo/mocks/csgoStrategyInvalidSide.mock'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { csgoItems } from '~src/features/csgo/data/csgoItems'

describe('SideValidator()', () => {
  const csgoDataManager: IGameDataManager<
    ICSGODocuments.Output.Item
  > = gameDataManager<ICSGODocuments.Output.Item>(csgoItems)

  test('sideValidator() with imported mock data [valid]', async () => {
    await expect(
      sideValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ errors: [], result: true })
  })

  test('sideValidator() with imported mock data [invalid]', async () => {
    await expect(
      sideValidator(
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyInvalidSide)
      ).execute()
    ).resolves.toEqual({
      errors: [
        Error('M4A4 is not equippable on ATK side'),
        Error('P2000 is not equippable on ATK side')
      ],
      result: false
    })
  })
})
