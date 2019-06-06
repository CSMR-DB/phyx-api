import { objectToArray } from '~src/utils/objectToArray'
import {
  ICSGOStrategy,
  ICSGOPlayer,
  ICSGOLoadout,
  ICSGOItem,
  ICSGOPlayers
} from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { IStrategyDataTransposer } from '~src/services/validators/validator-modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGOStrategy
): IStrategyDataTransposer {
  const {
    team: { players }
  }: { team: { players: ICSGOPlayers } } = strategy

  function uniqueIDs(): ICSGOItem['internal_id'][] {
    const playersArray: ICSGOPlayer[] = objectToArray(players)

    const loadoutArray: ICSGOLoadout[] = playersArray.map(
      (player: ICSGOPlayer) => player['loadout']
    )

    const items: ICSGOItem[] = loadoutArray
      .map((loadout: ICSGOLoadout) => [
        loadout.primary || ({} as ICSGOItem),
        loadout.secondary,
        ...(loadout.gear || ([] as ICSGOItem[])),
        ...(loadout.utilities || ([] as ICSGOItem[]))
      ])
      .reduce((pV: ICSGOItem[], cV: ICSGOItem[]) => pV.concat(cV))

    const ids: ICSGOItem['internal_id'][] = items.map(
      ({ internal_id }: { internal_id: string }) => internal_id
    )

    return Array.from(new Set(ids))
  }

  return Object.freeze({ uniqueIDs: uniqueIDs() })
}
