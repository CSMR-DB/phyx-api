import { R6SIEGE } from '../data/r6siege.factory'
import { ISiegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'
import {
  ISiegeStrategy,
  ISiegePlayer
} from './../ISiegeStrategyModel.interface'
import { IGameDataManager } from '../../../services/gameDataManager'
import { IValidator } from '~src/services/validators/IValidator.interface'

export function siegeReinforcementValidator(
  strategy: ISiegeStrategy,
  gameDataManager: IGameDataManager<R6SIEGE.IMap, keyof R6SIEGE.IMap>,
  strategyDataTransposer: ISiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<boolean> {
    const map: R6SIEGE.IMap | undefined = gameDataManager.getOneById(
      strategy.map
    )

    const {
      players
    }: { players: () => ISiegePlayer[] } = strategyDataTransposer

    const results: boolean[] = []

    const reinforced: string[] = players()
      .map((player: ISiegePlayer) => player.reinforced)
      .reduce((playerReinforcements: string[]) => playerReinforcements)

    const walls: { internal_id: string; reinforceable: boolean }[] = map!.walls

    const reinforceableWallIDs: (string | false)[] = walls.map(
      ({ reinforceable, internal_id }) => reinforceable === true && internal_id
    )

    reinforced.map((reinforcement: string) => {
      const wallIsReinforceable: boolean =
        reinforceableWallIDs.indexOf(reinforcement) !== -1
      results.push(wallIsReinforceable)
    })

    const result: boolean = !(results.indexOf(false) > -1)

    return await result
  }

  return Object.freeze({ execute })
}
