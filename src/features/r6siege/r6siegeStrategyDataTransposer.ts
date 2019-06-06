import {
  IR6SiegeStrategy,
  IR6SiegePlayer,
  IR6SiegeOperator,
  IR6SiegePlayers
} from '~src/features/r6siege/IR6SiegeStrategyModel.interface'
import { objectToArray } from '~src/utils/objectToArray'

export interface IR6SiegeStrategyDataTransposer {
  readonly players: IR6SiegePlayer[]
  readonly operators: IR6SiegeOperator[]
  readonly uniqueOperatorIDs: IR6SiegeOperator['internal_id'][]
  readonly map: string
}

export function siegeStrategyDataTransposer(
  strategy: IR6SiegeStrategy
): IR6SiegeStrategyDataTransposer {
  const {
    map,
    team: { players: _players }
  }: { map: string; team: { players: IR6SiegePlayers } } = strategy

  const players: IR6SiegePlayer[] = objectToArray(_players)

  const operators: IR6SiegeOperator[] = players.map(
    ({ operator }: { operator: IR6SiegeOperator }) => operator
  )

  const uniqueOperatorIDs: string[] = Array.from(
    new Set(
      operators.map(({ internal_id }: { internal_id: string }) => internal_id)
    )
  )

  return Object.freeze({ map, players, operators, uniqueOperatorIDs })
}
