import { itemsValidator } from './itemsValidator'
import csgoStrategyValid from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import csgoStrategyInvalidItems from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { gameDataManager, IGameDataManager } from '~src/services/gameDataManager'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'

describe('ItemsValidator', () => {
  const csgoDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem> = gameDataManager<ICSGOItem, keyof ICSGOItem>(
    CSGOFACTORY.getItems()
  )

  test('validates reduced items, valid', async () => {
    await expect(
      itemsValidator(csgoStrategyValid, csgoDataManager, csgoStrategyDataTransposer(csgoStrategyValid)).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })

  test('validates reduced items, invalid', async () => {
    await expect(
      itemsValidator(csgoStrategyInvalidItems, csgoDataManager, csgoStrategyDataTransposer(csgoStrategyInvalidItems)).execute()
    ).resolves.toEqual({ result: false, errors: [ Error('GLOCKZZZZ18 does not exist') ] })
  })

  test('validates reduced items, valid', async () => {
    await expect(
      itemsValidator(csgoStrategyValid, csgoDataManager, csgoStrategyDataTransposer(csgoStrategyValid)).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
