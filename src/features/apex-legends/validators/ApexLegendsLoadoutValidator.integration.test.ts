import { ApexLegendsLoadoutValidator } from './ApexLegendsLoadoutValidator';
import { apexLegendsStrategyInvalidLoadout } from '../tests/apexLegendsStrategyInvalidLoadout';
import { apexLegendsStrategyValid } from '../tests/apexLegendsStrategyValid';
import { ApexLegendsContainer } from '../di/ApexLegendsDI';
import { ValidatorReturnType } from '../../../services/validators/IValidator.interface';

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('ApexLegendsLoadoutValidator, via Injector', () => {
    require('~src/testing/__test_mongodb_preload__')
    require('./../tests/__InsertMongoData__')

    const loadoutValidator: ApexLegendsLoadoutValidator = ApexLegendsContainer.resolve(
        ApexLegendsLoadoutValidator
    )

    test('should validate a valid loadout', async () => {
        await expect(
            loadoutValidator.execute(apexLegendsStrategyValid)
        ).resolves.toEqual({
        result: true,
        errors: []
        })
    })

    test('should invalidate an invalid loadout', async () => {
        const result: ValidatorReturnType = await loadoutValidator.execute(
        apexLegendsStrategyInvalidLoadout
        )

        expect(result.errors[0].message).toContain('MASTIVE')
    })
})