import {
  ISiegeStrategy,
  ISiegePlayer,
  ISiegeOperator,
  ISiegePlayers
} from '~src/features/r6siege/IR6SiegeStrategyModel.interface'
import { objectToArray } from '~src/utils/objectToArray'

export interface ISiegeStrategyDataTransposer {
  readonly players: ISiegePlayer[]
  readonly operators: ISiegeOperator[]
  readonly uniqueOperatorIDs: ISiegeOperator['internal_id'][]
  readonly map: string
}

export function siegeStrategyDataTransposer(
  strategy: ISiegeStrategy
): ISiegeStrategyDataTransposer {
  const {
    map,
    team: { players: _players }
  }: { map: string; team: { players: ISiegePlayers } } = strategy

  const players: ISiegePlayer[] = objectToArray(_players)

  const operators: ISiegeOperator[] = players.map(
    ({ operator }: { operator: ISiegeOperator }) => operator
  )

  const uniqueOperatorIDs: string[] = Array.from(
    new Set(
      operators.map(({ internal_id }: { internal_id: string }) => internal_id)
    )
  )

  return Object.freeze({ map, players, operators, uniqueOperatorIDs })
}
