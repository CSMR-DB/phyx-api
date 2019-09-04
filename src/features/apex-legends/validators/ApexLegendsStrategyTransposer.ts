import {
  IApexLegendsStrategyDocument,
  IApexLegendsPlayer
} from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { flattenArray } from '~src/utils/flattenArray';

@ApexLegendsInjectable()
export class ApexLegendsStrategyTransposer {
  transpose(strategy: IApexLegendsStrategyDocument): { legends: string[], items: string[] } {
    const {
      team: { players }
    }: IApexLegendsStrategyDocument = strategy

    const legends: string[] = players.map(
      (player: IApexLegendsPlayer) => player.legend
    )

    const items: string[] = flattenArray(players.map((player: IApexLegendsPlayer) => [ player.loadout.primary, player.loadout.secondary ]))

    return { legends, items }
  }
}
