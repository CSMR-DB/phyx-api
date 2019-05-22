import { ISiegeStrategy, ISiegePlayer, ISiegeOperator, ISiegePlayers } from '~src/features/siege/ISiegeStrategyModel.interface'
import { objectToArray } from '~src/utils/objectToArray'

export interface ISiegeStrategyDataTransposer {
  readonly players: () => ISiegePlayer[]
  readonly operators: () => ISiegeOperator[]
  readonly uniqueOperatorIDs: () => ISiegeOperator['internal_id'][]
}

export function siegeStrategyDataTransposer(strategy: ISiegeStrategy): ISiegeStrategyDataTransposer {
  const {
    team: { players: _players }
  }: { team: { players: ISiegePlayers } } = strategy

  function players(): ISiegePlayer[] {
    const result: ISiegePlayer[] = objectToArray(_players)

    return result
  }

  function operators(): ISiegeOperator[] {
    const result: ISiegeOperator[] = players().map(({ operator }: { operator: ISiegeOperator }) => operator)

    return result
  }

  function uniqueOperatorIDs(): ISiegeOperator['internal_id'][] {
    const result: string[] = Array.from(new Set(operators().map(({ internal_id }: { internal_id: string }) => internal_id)))

    return result
  }

  return Object.freeze({ players, operators, uniqueOperatorIDs })
}
