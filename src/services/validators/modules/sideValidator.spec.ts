import { sideValidator } from './sideValidator'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidSide } from '~src/features/csgo/mocks/csgoStrategyInvalidSide.mock'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'

describe('SideValidator()', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOItem,
    keyof ICSGOItem
  > = gameDataManager<ICSGOItem, keyof ICSGOItem>(CSGOFACTORY.getItems())

  test('sideValidator() with imported mock data [valid]', async () => {
    await expect(
      sideValidator(
        csgoStrategyValid,
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ errors: [], result: true })
  })

  test('sideValidator() with imported mock data [invalid]', async () => {
    await expect(
      sideValidator(
        csgoStrategyInvalidSide,
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyInvalidSide)
      ).execute()
    ).resolves.toEqual({
      errors: [
        Error('P2000 is not equippable on ATK side'),
        Error('M4A4 is not equippable on ATK side')
      ],
      result: false
    })
  })
})
