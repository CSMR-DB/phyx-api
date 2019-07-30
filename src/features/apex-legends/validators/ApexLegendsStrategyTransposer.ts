import {
  IApexLegendsStrategyDocument,
  IApexLegendsPlayer
} from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsStrategyTransposer {
  transpose(strategy: IApexLegendsStrategyDocument): { legends: string[] } {
    const {
      team: { players }
    }: IApexLegendsStrategyDocument = strategy

    const legends: string[] = players.map(
      (player: IApexLegendsPlayer) => player.legend
    )

    return { legends }
  }
}
