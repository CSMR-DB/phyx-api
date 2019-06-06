import { R6SIEGE } from '../data/r6siege.factory'
import { IR6SiegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'
import { IR6SiegePlayer } from '../IR6SiegeStrategyModel.interface'
import { IGameDataManager } from '../../../services/gameDataManager'
import { IValidator } from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/validator-modules/isValidated'

export function siegeReinforcementValidator(
  gameDataManager: IGameDataManager<R6SIEGE.IMap, keyof R6SIEGE.IMap>,
  strategyDataTransposer: IR6SiegeStrategyDataTransposer
): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] }> {
    const map: R6SIEGE.IMap | undefined = gameDataManager.getOneById(
      strategyDataTransposer.map
    )

    const { players }: { players: IR6SiegePlayer[] } = strategyDataTransposer

    const results: boolean[] = []

    const errors: Error[] = []

    const reinforced: string[] = players
      .map((player: IR6SiegePlayer) => player.reinforced)
      .reduce((playerReinforcements: string[]) => playerReinforcements)

    const walls: { internal_id: string; reinforceable: boolean }[] = map!.walls

    const reinforceableWallIDs: (string | false)[] = walls.map(
      ({
        reinforceable,
        internal_id
      }: {
        internal_id: string
        reinforceable: boolean
      }) => reinforceable === true && internal_id
    )

    reinforced.map((reinforcement: string) => {
      const wallIsReinforceable: boolean =
        reinforceableWallIDs.indexOf(reinforcement) !== -1

      if (!wallIsReinforceable)
        errors.push(Error(`${reinforcement} is not possible`))

      results.push(wallIsReinforceable)
    })

    return await { result: isValidated(results), errors }
  }

  return Object.freeze({ execute })
}
