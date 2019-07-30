import { ApexLegendsTeamValidator } from './ApexLegendsTeamValidator'
import {
  ValidatorReturnType,
  IValidatorWithStrategy
} from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'
import { IApexLegendsStrategyDocument } from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsStrategyValidator {
  private _validators: any[] = []

  constructor(apexLegendsTeamValidator: ApexLegendsTeamValidator) {
    this._validators = [ apexLegendsTeamValidator ]
  }

  async execute(
    strategy: IApexLegendsStrategyDocument
  ): Promise<ValidatorReturnType> {
    const resultPromises: Promise<ValidatorReturnType>[] = this._validators.map(
      (validator: IValidatorWithStrategy<IApexLegendsStrategyDocument>) =>
        validator.execute(strategy)
    )

    const results: boolean[] = []
    const errors: Error[] = []

    await Promise.all(resultPromises).then(
      (promises: ValidatorReturnType[]) => {
        promises.map((promise: ValidatorReturnType) => {
          results.push(promise.result)
          errors.push(...promise.errors)
        })
      }
    )

    const result: boolean = isValidated(Array.from(new Set(results)))

    return { result, errors }
  }
}
