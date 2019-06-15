import { objectToArray } from '~src/utils/objectToArray'
import {
  ICSGOStrategy,
  ICSGOPlayer,
  ICSGOLoadout,
  ICSGOItem,
  ICSGOPlayers
} from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGOStrategy
): IStrategyDataTransposer & {
  slots: { internal_id: string; slot: string }[]
} {
  const {
    team: { players }
  }: { team: { players: ICSGOPlayers } } = strategy

  const playersArray: ICSGOPlayer[] = objectToArray(players)
  const loadoutArray: ICSGOLoadout[] = playersArray.map(
    (player: ICSGOPlayer) => player['loadout']
  )

  function uniqueIDs(): ICSGOItem['internal_id'][] {
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

  function slots(): { internal_id: string; slot: string }[] {
    const items: {
      slot: string
      internal_id: string
    }[] = loadoutArray.map((loadout: ICSGOLoadout) => ({
      slot: 'secondary',
      internal_id: loadout.secondary.internal_id
    }))

    loadoutArray.map((loadout: ICSGOLoadout) => {
      if (loadout.primary) {
        items.push({
          slot: 'primary',
          internal_id: loadout.primary.internal_id
        })
      }

      if (loadout.gear) {
        loadout.gear.map((item: ICSGOItem) => {
          if (item) {
            items.push({
              slot: 'gear',
              internal_id: item.internal_id
            })
          }
        })
      }
      if (loadout.utilities) {
        loadout.utilities.map((item: ICSGOItem) => {
          if (item) {
            items.push({
              slot: 'utilities',
              internal_id: item.internal_id
            })
          }
        })
      }
    })

    return Array.from(
      new Set(
        items.filter((item: { internal_id: string; slot: string }) => item)
      )
    )
  }

  return Object.freeze({ uniqueIDs: uniqueIDs(), slots: slots() })
}
