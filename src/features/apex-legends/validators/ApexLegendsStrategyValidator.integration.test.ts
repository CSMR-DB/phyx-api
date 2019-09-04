import { ApexLegendsContainer } from '../di/ApexLegendsDI'
import { apexLegendsStrategyValid } from '../tests/apexLegendsStrategyValid'
import { ApexLegendsStrategyValidator } from './ApexLegendsStrategyValidator'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('ApexLegendsTeamValidator, via Injector', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('./../tests/__InsertMongoData__')

  test('should validate a valid strategy', async () => {
    const strategyValidator: ApexLegendsStrategyValidator = ApexLegendsContainer.resolve(
      ApexLegendsStrategyValidator
    )

    await expect(
      strategyValidator.execute(apexLegendsStrategyValid)
    ).resolves.toEqual({
      result: true,
      errors: []
    })
  })
})
