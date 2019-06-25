import { csgoStrategyValidator } from './csgoStrategyValidator'
import { csgoStrategyValid } from '../../mocks/csgoStrategyValid.mock'

process.env.DB_TEST_COLLECTION = 'csgoStrategyValidatorIntegrationTest'

describe('csgoStrategyValidator', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  test('should return valid when supplied with a valid strategy', async () => {
    await expect(csgoStrategyValidator(csgoStrategyValid)).resolves.toEqual({
      result: true,
      errors: []
    })
  })
})
