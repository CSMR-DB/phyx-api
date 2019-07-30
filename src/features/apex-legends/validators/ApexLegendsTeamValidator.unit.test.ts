import { ApexLegendsTeamValidator } from './ApexLegendsTeamValidator'
import { apexLegendsStrategyValid } from '../tests/apexLegendsStrategyValid'
import { ApexLegendsDataManager } from './ApexLegendsDataManager'
import { ApexLegendsStrategyTransposer } from './ApexLegendsStrategyTransposer'
import { ApexLegendsContainer } from './../di/ApexLegendsDI'
import { apexLegendsStrategyInvalidLegend } from '../tests/apexLegendsStrategyInvalidLegend'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { ApexLegendsDatabaseService } from './../graphql/ApexLegendsDatabaseService'
import { ApexLegendsStrategyMongooseModel } from './../mongodb/ApexLegendsStrategyMongooseModel'
import { ApexLegendsItemMongooseModel } from './../mongodb/ApexLegendsItemMongooseModel'
import { ApexLegendsLegendMongooseModel } from './../mongodb/ApexLegendsLegendMongooseModel'

describe('ApexLegendsTeamValidator, manually constructed', () => {
  const teamValidator: ApexLegendsTeamValidator = new ApexLegendsTeamValidator(
    new ApexLegendsDataManager(
      new ApexLegendsDatabaseService(
        new ApexLegendsStrategyMongooseModel(),
        new ApexLegendsItemMongooseModel(),
        new ApexLegendsLegendMongooseModel()
      )
    ),
    new ApexLegendsStrategyTransposer()
  )

  test('should validate a valid team', async () => {
    await expect(
      teamValidator.execute(apexLegendsStrategyValid)
    ).resolves.toEqual({
      result: true,
      errors: []
    })
  })
})

describe('ApexLegendsTeamValidator, via Injector', () => {
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
