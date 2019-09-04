import { IApexLegend, IApexLegendsItem } from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { ApexLegendsDatabaseService } from './../services/ApexLegendsDatabaseService'

@ApexLegendsInjectable()
export class ApexLegendsDataManager {
  private _legends: Promise<IApexLegend[]>
  private _items: Promise<IApexLegendsItem[]>

  constructor(dbService: ApexLegendsDatabaseService) {
    this._legends = dbService.getLegends()
    this._items = dbService.getItems()
  }

  get legends(): Promise<IApexLegend[]> {
    return this._legends
  }

  get legendIDs(): Promise<string[]> {
    return this._legends.then((legends: IApexLegend[]) =>
      legends.map(({ _id }: IApexLegend) => _id)
    )
  }

  get items(): Promise<IApexLegendsItem[]> {
    return this._items
  }
}
