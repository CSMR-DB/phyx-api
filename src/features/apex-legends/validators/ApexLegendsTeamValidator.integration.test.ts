import { ValidatorReturnType } from '../../../services/validators/IValidator.interface';
import { ApexLegendsTeamValidator } from './ApexLegendsTeamValidator'
import { apexLegendsStrategyValid } from '../tests/apexLegendsStrategyValid'
import { ApexLegendsContainer } from '../di/ApexLegendsDI'
import { apexLegendsStrategyInvalidLegend } from '../tests/apexLegendsStrategyInvalidLegend'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('ApexLegendsTeamValidator, via Injector', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('./../tests/__InsertMongoData__')
  
  const teamValidator: ApexLegendsTeamValidator = ApexLegendsContainer.resolve(
    ApexLegendsTeamValidator
  )

  test('should validate a valid team', async () => {
    await expect(
      teamValidator.execute(apexLegendsStrategyValid)
    ).resolves.toEqual({
      result: true,
      errors: []
    })
  })

  test('should invalidate an invalid team', async () => {
    const result: ValidatorReturnType = await teamValidator.execute(
      apexLegendsStrategyInvalidLegend
    )

    expect(result.errors[0].message).toContain('MONTAGNE')
  })
})
