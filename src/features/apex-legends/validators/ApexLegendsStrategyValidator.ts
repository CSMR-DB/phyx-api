import { ApexLegendsLoadoutValidator } from './ApexLegendsLoadoutValidator';
import { ApexLegendsTeamValidator } from './ApexLegendsTeamValidator'
import {
  ValidatorReturnType,
  IValidatorWithStrategy
} from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'
import { IApexLegendsStrategyDocument } from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { flattenArray } from '~src/utils/flattenArray';

@ApexLegendsInjectable()
export class ApexLegendsStrategyValidator {
  private _validators: any[] = []

  constructor(apexLegendsTeamValidator: ApexLegendsTeamValidator, apexLegendsLoadoutValidator: ApexLegendsLoadoutValidator) {
    this._validators = [ apexLegendsTeamValidator, apexLegendsLoadoutValidator ]
  }

  async execute(
    strategy: IApexLegendsStrategyDocument
  ): Promise<ValidatorReturnType> {
    const resultPromises: Promise<ValidatorReturnType>[] = this._validators.map(
      (validator: IValidatorWithStrategy<IApexLegendsStrategyDocument>) =>
        validator.execute(strategy)
    )

    const resultObj: ValidatorReturnType[] = await Promise.all(resultPromises).then(
      (promises: ValidatorReturnType[]) => 
        promises.map((promise: ValidatorReturnType) => promise) 
    )

    const { result, errors }: { result: boolean, errors: Error[] } = { 
      result: isValidated(Array.from(new Set(resultObj.map((obj:ValidatorReturnType) => obj.result)))), 
      errors: flattenArray(resultObj.map((obj:ValidatorReturnType)=>obj.errors)) 
    }

    return { result, errors }
  }
}
