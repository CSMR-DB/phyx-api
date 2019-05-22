import { csgoStrategyDataTransposer } from './csgoStrategyDataTransposer'
import { gameDataManager } from '~src/services/gameDataManager'
import csgoStrategyValid from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import csgoStrategyInvalidItems from './mocks/csgoStrategyInvalidItems.mock'

describe('CSGOStrategyDataTransposer()', () => {
  test('should reduce items to a unique set of IDs', () => {
    expect(csgoStrategyDataTransposer(csgoStrategyValid).uniqueIDs).toContain('AWP')
  })

  test('should reduce items to a unique set of IDs', () => {
    expect(csgoStrategyDataTransposer(csgoStrategyInvalidItems).uniqueIDs).toContain('AUG')
  })
})
