import { slotValidator } from './slotValidator'
import { csgoStrategyInvalidSlots } from './../../../features/csgo/mocks/csgoStrategyInvalidSlots.mock'
import {
  IGameDataManager,
  gameDataManager
} from '~src/services/gameDataManager'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'

describe('slotValidator()', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  > = gameDataManager<
    ICSGOStrategyDocument.Item,
    keyof ICSGOStrategyDocument.Item
  >(CSGOFACTORY.getItems())

  test('should validate a valid strategy', async () => {
    await expect(
      slotValidator(
        csgoStrategyValid,
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })

  test('should invalidate a strategy with item(s) in the wrong slot(s)', async () => {
    await expect(
      slotValidator(
        csgoStrategyInvalidSlots,
        csgoDataManager,
        csgoStrategyDataTransposer(csgoStrategyInvalidSlots)
      ).execute()
    ).resolves.toEqual({
      result: false,
      errors: [
        Error('AWP is not equippable in the secondary slot'),
        Error('GLOCK18 is not equippable in the primary slot')
      ]
    })
  })
})
