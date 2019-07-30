import {
  ValidatorReturnType,
  IValidatorWithStrategy
} from '~src/services/validators/IValidator.interface'
import { ApexLegendsStrategyTransposer } from './ApexLegendsStrategyTransposer'
import { IApexLegendsStrategyDocument } from '../interfaces/index.interface'
import { ApexLegendsDataManager } from './ApexLegendsDataManager'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsTeamValidator
  implements IValidatorWithStrategy<IApexLegendsStrategyDocument> {
  constructor(
    public dataManager: ApexLegendsDataManager,
    public strategyTransposer: ApexLegendsStrategyTransposer
  ) {}

  async execute(
    strategy: IApexLegendsStrategyDocument
  ): Promise<ValidatorReturnType> {
    const legends: string[] = this.strategyTransposer.transpose(strategy)
      .legends
    const validLegendIDs: string[] = await this.dataManager.legendIDs
    const legendErrors: Error[] = legends
      .filter((legend: string) => validLegendIDs.indexOf(legend) === -1)
      .map((legend: string) => Error(`Legend is not valid: ${legend}`))

    return await { result: legendErrors.length === 0, errors: legendErrors }
  }
}
