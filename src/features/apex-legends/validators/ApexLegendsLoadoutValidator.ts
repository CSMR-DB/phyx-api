import {
  ValidatorReturnType,
  IValidatorWithStrategy
} from '~src/services/validators/IValidator.interface'
import { ApexLegendsStrategyTransposer } from './ApexLegendsStrategyTransposer'
import { IApexLegendsStrategyDocument, IApexLegendsItem } from '../interfaces/index.interface'
import { ApexLegendsDataManager } from './ApexLegendsDataManager'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsLoadoutValidator
  implements IValidatorWithStrategy<IApexLegendsStrategyDocument> {
  constructor(
    public dataManager: ApexLegendsDataManager,
    public strategyTransposer: ApexLegendsStrategyTransposer
  ) {}

  async execute(
    strategy: IApexLegendsStrategyDocument
  ): Promise<ValidatorReturnType> {
    const transposedItems: string[] = this.strategyTransposer.transpose(strategy)
      .items
    const validItemIDs: string[] = await this.dataManager.items.then((items: IApexLegendsItem[])=> items.map((item:IApexLegendsItem)=> item._id))
    const errors: Error[] = transposedItems
      .filter((item: string) => validItemIDs.indexOf(item) === -1)
      .map((item: string) => Error(`Item is not valid: ${item}`))

    return await { result: errors.length === 0, errors }
  }
}
